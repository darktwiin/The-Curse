// The Curse — le bot Discord du jeu.
// Il tourne dans le même programme que le serveur du jeu : il lit donc directement les joueurs en ligne, le classement, etc.
// Il ne démarre que si DISCORD_TOKEN est renseigné ; sans ça, le jeu fonctionne exactement comme avant.
//
// Réglages (variables d'environnement, dans le fichier de configuration du service) :
//   DISCORD_TOKEN    la clé secrète du bot (à ne jamais partager ni mettre sur GitHub)
//   DISCORD_SERVEUR  l'identifiant du serveur Discord (pour y installer les commandes /…)
//   DISCORD_SALON    l'identifiant du salon où le bot poste ses annonces
// Facultatifs :
//   DISCORD_SALON_RELIQUES  salon des reliques trouvées (sinon : DISCORD_SALON)
//   DISCORD_SALON_PECHE     salon des poissons légendaires (sinon : DISCORD_SALON)
//   DISCORD_SALON_TICKETS   salon où le bot ouvre les tickets (fils privés) ; sans lui, /ticket est désactivé
//   DISCORD_SALON_COMMANDES salon réservé aux commandes du bot (/lier, /classement…) ; ailleurs, le bot renvoie vers ce salon
//   DISCORD_SALON_PATCH     salon des notes de mise à jour, rempli tout seul à chaque nouvelle version
//   DISCORD_ROLE_JOUEUR     rôle donné quand un joueur lie son compte de jeu
//   DISCORD_ROLE_ALPHA      rôle donné en plus aux alpha testeurs
//   DISCORD_ROLE_MODO       rôle prévenu à l'ouverture d'un ticket
//
// Aucune dépendance en plus : il parle à Discord avec « ws » (déjà utilisé par le jeu) et fetch (fourni par Node).
'use strict';
const WebSocket = require('ws');

const TOKEN = process.env.DISCORD_TOKEN || '';
const SERVEUR = process.env.DISCORD_SERVEUR || '';
const SALON = process.env.DISCORD_SALON || '';
const SALON_COMMANDES = process.env.DISCORD_SALON_COMMANDES || '', SALON_PATCH = process.env.DISCORD_SALON_PATCH || '';
const SALONS = { reliques: process.env.DISCORD_SALON_RELIQUES || SALON, peche: process.env.DISCORD_SALON_PECHE || SALON, patch: SALON_PATCH };
const SALON_TICKETS = process.env.DISCORD_SALON_TICKETS || '', ROLE_JOUEUR = process.env.DISCORD_ROLE_JOUEUR || '', ROLE_ALPHA = process.env.DISCORD_ROLE_ALPHA || '', ROLE_MODO = process.env.DISCORD_ROLE_MODO || '';
const API = (process.env.DISCORD_API || 'https://discord.com/api/v10').replace(/\/$/, '');
const journal = (...a) => console.log('[discord]', ...a);

let jeu = null;            // ce que le serveur du jeu nous prête : { enLigne(), version(), classement(), guerre(), lien }
let ws = null, seq = null, session = null, repriseUrl = null, battement = null, accuse = true, appId = null, arrete = false, essais = 0;
let derniereActivite = '';

// ---------- appels à Discord (file d'attente : un à la fois, on respecte les limites de débit) ----------
const file = []; let enCours = false;
function appel(methode, chemin, corps) { return new Promise(res => { file.push({ methode, chemin, corps, res, n: 0 }); vider(); }); }
async function vider() {
  if (enCours) return; enCours = true;
  while (file.length) {
    const a = file[0];
    try {
      const r = await fetch(API + a.chemin, { method: a.methode, headers: { Authorization: 'Bot ' + TOKEN, 'Content-Type': 'application/json' }, body: a.corps ? JSON.stringify(a.corps) : undefined });
      if (r.status === 429 && a.n < 3) { let s = 1; try { s = Math.min(30, +(await r.json()).retry_after || 1); } catch {} a.n++; await new Promise(z => setTimeout(z, s * 1000 + 100)); continue; }
      let j = null; try { j = await r.json(); } catch {}
      if (!r.ok) journal('refus', a.methode, a.chemin.replace(/\/interactions\/.*/, '/interactions/…'), r.status, j && j.message ? j.message : '');
      a.res(r.ok ? (j || {}) : null);
    } catch (e) { journal('erreur réseau', e.message); a.res(null); }
    file.shift();
  }
  enCours = false;
}

// ---------- annonces dans le salon ----------
// « cle » évite les doublons : la même annonce n'est pas répétée avant « delai » millisecondes
const vues = new Map();
function annoncer(texte, cle, delai, salon) {
  const ou = salon === 'patch' ? SALON_PATCH : (salon && SALONS[salon]) || SALON;
  if (!TOKEN || !ou || !texte) return;
  if (cle) { const t = vues.get(cle) || 0; if (Date.now() - t < (delai || 60000)) return; vues.set(cle, Date.now()); }
  appel('POST', '/channels/' + ou + '/messages', { content: String(texte).slice(0, 1900), allowed_mentions: { parse: [] } });
}

// ---------- commandes /… ----------
const COMMANDES = [
  { name: 'enligne', description: 'Combien de joueurs sont en jeu en ce moment' },
  { name: 'jouer', description: 'Le lien du jeu et du wiki' },
  { name: 'guerre', description: 'Quelle guilde tient quelle zone en ce moment' },
  { name: 'classement', description: 'Les 10 premiers du classement', options: [{ type: 3, name: 'type', description: 'Quel classement', required: false,
    choices: [{ name: 'Prestige', value: 'prestige' }, { name: 'Monstres tués', value: 'kills' }, { name: 'Pièces', value: 'or' }, { name: 'Maisons (cœurs)', value: 'maisons' }] }] },
  { name: 'lier', description: 'Lier ton compte de jeu à ton Discord (code donné en jeu, bouton Discord au Village)', options: [{ type: 3, name: 'code', description: 'Le code à 6 caractères affiché en jeu', required: true }] },
  { name: 'ticket', description: 'Ouvrir un ticket privé avec l\'équipe (problème, achat, signalement)', options: [{ type: 3, name: 'sujet', description: 'En quelques mots, de quoi s\'agit-il ?', required: true }] },
  { name: 'fermer', description: 'Fermer le ticket dans lequel tu écris' },
];
const propre = s => String(s == null ? '' : s).replace(/[`*_~|>@#\\]/g, '').slice(0, 24);
const nombre = n => Math.round(+n || 0).toLocaleString('fr-FR');
function repondre(nom, options) {
  try {
    if (nom === 'enligne') { const l = jeu.enLigne(); return l.length ? '🟢 **' + l.length + '** joueur' + (l.length > 1 ? 's' : '') + ' en jeu : ' + l.slice(0, 30).map(propre).join(', ') + (l.length > 30 ? '…' : '') : '😴 Personne en jeu pour le moment.'; }
    if (nom === 'jouer') return '🎮 **Jouer** : ' + jeu.lien + '\n📖 **Wiki** : ' + jeu.lien + '/wiki.html\nVersion en ligne : ' + jeu.version();
    if (nom === 'guerre') { const z = jeu.guerre().filter(q => q.tenant); return z.length ? '⚔️ **Guerre des guildes** (bonus d\'or et d\'expérience pour l\'heure en cours)\n' + z.map(q => '• ' + propre(q.zone) + ' : **[' + propre(q.tag) + '] ' + propre(q.tenant) + '**').join('\n') : '⚔️ Aucune zone n\'est tenue par une guilde pour l\'instant.'; }
    if (nom === 'classement') {
      const type = (options || []).find(o => o.name === 'type'), k = type ? String(type.value) : 'prestige', T = { prestige: 'Prestige', kills: 'Monstres tués', or: 'Pièces', maisons: 'Maisons (cœurs)' };
      const l = (jeu.classement()[k] || []).slice(0, 10); if (!T[k]) return 'Classement inconnu.';
      return l.length ? '🏆 **Classement · ' + T[k] + '**\n' + l.map((e, i) => (i + 1) + '. ' + propre(e.n) + ' : ' + nombre(e.v)).join('\n') : 'Ce classement est encore vide.';
    }
  } catch (e) { journal('commande', nom, e.message); }
  return 'Commande indisponible pour le moment.';
}
// commandes privées (réponse visible seulement par celui qui tape) : on accuse réception tout de suite, puis on complète la réponse
async function prive(d, travail) {
  await appel('POST', '/interactions/' + d.id + '/' + d.token + '/callback', { type: 5, data: { flags: 64 } });
  let texte = 'Commande indisponible pour le moment.'; try { texte = await travail(); } catch (e) { journal('commande', d.data.name, e.message); }
  appel('PATCH', '/webhooks/' + appId + '/' + d.token + '/messages/@original', { content: String(texte).slice(0, 1900), allowed_mentions: { parse: [] } });
}
const option = (d, nom) => { const o = (d.data.options || []).find(x => x.name === nom); return o ? String(o.value) : ''; };
async function cmdLier(d, qui) {
  const r = jeu.lier(option(d, 'code'), qui.id, qui.global_name || qui.username); if (!r.ok) return '❌ ' + r.msg;
  let roles = '';
  for (const role of [ROLE_JOUEUR, r.alpha ? ROLE_ALPHA : '']) if (role && SERVEUR) { const ok = await appel('PUT', '/guilds/' + SERVEUR + '/members/' + qui.id + '/roles/' + role); if (!ok) roles = '\n(Je n\'ai pas pu te donner ton rôle : préviens un administrateur.)'; }
  return '✅ ' + r.msg + roles;
}
async function cmdTicket(d, qui) {
  if (!SALON_TICKETS) return 'Les tickets ne sont pas encore ouverts sur ce serveur.';
  const sujet = option(d, 'sujet').replace(/[`@#]/g, '').slice(0, 200), nom = ('ticket-' + (qui.global_name || qui.username || 'joueur')).toLowerCase().replace(/[^a-z0-9àâäéèêëîïôöùûüç-]/g, '-').slice(0, 40);
  const fil = await appel('POST', '/channels/' + SALON_TICKETS + '/threads', { name: nom, type: 12, invitable: false, auto_archive_duration: 10080 });
  if (!fil || !fil.id) return '❌ Impossible d\'ouvrir le ticket (il me manque peut-être la permission de créer des fils privés dans ce salon).';
  await appel('PUT', '/channels/' + fil.id + '/thread-members/' + qui.id);
  await appel('POST', '/channels/' + fil.id + '/messages', { content: '🎫 Ticket ouvert par <@' + qui.id + '>' + (ROLE_MODO ? ' · <@&' + ROLE_MODO + '>' : '') + '\n**Sujet :** ' + sujet + '\nExplique ton problème ici, l\'équipe te répondra dès que possible. Tape `/fermer` quand c\'est réglé.', allowed_mentions: { users: [qui.id], roles: ROLE_MODO ? [ROLE_MODO] : [] } });
  return '🎫 Ton ticket est ouvert : <#' + fil.id + '>';
}
async function cmdFermer(d) {
  const c = await appel('GET', '/channels/' + d.channel_id);
  if (!c || c.type !== 12 || c.parent_id !== SALON_TICKETS || !SALON_TICKETS) return 'Cette commande ne s\'utilise que dans un ticket.';
  await appel('POST', '/channels/' + d.channel_id + '/messages', { content: '🔒 Ticket fermé. Merci !', allowed_mentions: { parse: [] } });
  setTimeout(() => appel('PATCH', '/channels/' + d.channel_id, { archived: true, locked: true }), 1500).unref();
  return 'Ticket fermé.';
}
function interaction(d) {
  if (!d || d.type !== 2 || !d.data) return;
  const qui = (d.member && d.member.user) || d.user || {}, nom = d.data.name;
  // les commandes du bot se tapent dans leur salon (sauf les tickets, qu'on peut ouvrir et fermer de partout)
  if (SALON_COMMANDES && d.channel_id !== SALON_COMMANDES && nom !== 'ticket' && nom !== 'fermer')
    return void appel('POST', '/interactions/' + d.id + '/' + d.token + '/callback', { type: 4, data: { flags: 64, content: 'Les commandes du bot se tapent dans <#' + SALON_COMMANDES + '>.' } });
  if (nom === 'lier') return void prive(d, () => cmdLier(d, qui));
  if (nom === 'ticket') return void prive(d, () => cmdTicket(d, qui));
  if (nom === 'fermer') return void prive(d, () => cmdFermer(d));
  const texte = repondre(nom, d.data.options);
  appel('POST', '/interactions/' + d.id + '/' + d.token + '/callback', { type: 4, data: { content: texte.slice(0, 1900), allowed_mentions: { parse: [] } } });
}

// ---------- activité affichée sous le nom du bot : « Regarde 3 joueurs en ligne » ----------
function activite(force) {
  if (!ws || ws.readyState !== 1 || !session) return;
  let n = 0; try { n = jeu.enLigne().length; } catch {}
  const txt = n + ' joueur' + (n > 1 ? 's' : '') + ' en ligne';
  if (!force && txt === derniereActivite) return; derniereActivite = txt;
  envoyer({ op: 3, d: { since: null, activities: [{ name: txt, type: 3 }], status: 'online', afk: false } });
}

// ---------- connexion permanente à Discord ----------
const envoyer = o => { try { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); } catch {} };
async function connecter() {
  if (arrete) return;
  let url = repriseUrl || process.env.DISCORD_GATEWAY || '';
  if (!url) { const g = await appel('GET', '/gateway/bot'); url = g && g.url; if (!url) { journal('connexion impossible (clé refusée ou Discord injoignable), nouvel essai dans 1 min'); return setTimeout(connecter, 60000).unref(); } }
  const moi = ws = new WebSocket(url.replace(/\/$/, '') + '/?v=10&encoding=json');
  moi.on('message', brut => { let m; try { m = JSON.parse(brut); } catch { return; } if (moi === ws) recevoir(m); });
  moi.on('error', e => journal('liaison', e.message));
  moi.on('close', code => { if (moi !== ws) return; clearInterval(battement); battement = null;
    // codes sans appel : clé invalide (4004), intentions refusées (4013, 4014)… on ne réessaie pas en boucle
    if ([4004, 4010, 4011, 4012, 4013, 4014].includes(code)) { journal('Discord refuse la connexion (code ' + code + ') : vérifie DISCORD_TOKEN'); arrete = true; return; }
    if ([4007, 4009].includes(code)) { session = null; repriseUrl = null; }
    essais++; const attente = Math.min(60000, 2000 * essais); setTimeout(connecter, attente).unref(); });
}
function recevoir(m) {
  if (m.s != null) seq = m.s;
  if (m.op === 10) { // bonjour : on démarre le battement de cœur, puis on se présente (ou on reprend la session)
    accuse = true; clearInterval(battement);
    const iv = Math.max(5000, +m.d.heartbeat_interval || 41250);
    battement = setInterval(() => { if (!accuse) { try { ws.terminate(); } catch {} return; } accuse = false; envoyer({ op: 1, d: seq }); }, iv); battement.unref();
    setTimeout(() => envoyer({ op: 1, d: seq }), Math.random() * 1000).unref();
    if (session) envoyer({ op: 6, d: { token: TOKEN, session_id: session, seq } });
    else envoyer({ op: 2, d: { token: TOKEN, intents: 1, properties: { os: 'linux', browser: 'the-curse', device: 'the-curse' } } });
  } else if (m.op === 11) accuse = true;
  else if (m.op === 1) envoyer({ op: 1, d: seq });
  else if (m.op === 7) { try { ws.close(4000); } catch {} }                 // Discord demande de se reconnecter
  else if (m.op === 9) { if (!m.d) { session = null; repriseUrl = null; } setTimeout(() => { try { ws.close(4000); } catch {} }, 1500 + Math.random() * 3000).unref(); } // session perdue
  else if (m.op === 0) {
    if (m.t === 'READY') {
      session = m.d.session_id; repriseUrl = m.d.resume_gateway_url || null; essais = 0; appId = m.d.application && m.d.application.id;
      journal('connecté en tant que ' + (m.d.user && m.d.user.username));
      if (appId && SERVEUR) appel('PUT', '/applications/' + appId + '/guilds/' + SERVEUR + '/commands', COMMANDES).then(r => { if (r) journal('commandes installées : ' + COMMANDES.map(c => '/' + c.name).join(' ')); });
      activite(true);
    } else if (m.t === 'RESUMED') { essais = 0; activite(true); }
    else if (m.t === 'INTERACTION_CREATE') interaction(m.d);
  }
}

// Transforme une section du CHANGELOG (« ## ver.X … » puis des puces) en messages Discord.
// Les lignes qui commencent par « - (interne) » ne sont pas publiées.
function notesDeVersion(changelog, version) {
  const lignes = String(changelog || '').split('\n'), debut = lignes.findIndex(l => l.startsWith('## ' + version + ' ') || l.trim() === '## ' + version);
  if (debut < 0) return [];
  const corps = []; let saute = false;
  for (let i = debut + 1; i < lignes.length && !lignes[i].startsWith('## '); i++) { const l = lignes[i];
    if (/^- /.test(l)) saute = /^- \(interne\)/i.test(l);
    if (!saute && l.trim()) corps.push(l.replace(/^- /, '• ').replace(/^  - /, '   ◦ ')); }
  if (!corps.length) return [];
  const messages = []; let cur = '# 🛠️ The Curse ' + version + '\n';
  for (const l of corps) { if (cur.length + l.length + 1 > 1800) { messages.push(cur); cur = ''; } cur += l + '\n'; }
  messages.push(cur); return messages;
}
function publierNotes(changelog, versions) { if (!TOKEN || !SALON_PATCH) return 0; let n = 0;
  for (const v of versions) for (const m of notesDeVersion(changelog, v)) { appel('POST', '/channels/' + SALON_PATCH + '/messages', { content: m, allowed_mentions: { parse: [] } }); n++; }
  return n; }

function demarrer(acces) {
  jeu = acces;
  if (!TOKEN) { journal('pas de DISCORD_TOKEN : le bot Discord reste éteint'); return false; }
  if (!SERVEUR) journal('DISCORD_SERVEUR manquant : les commandes /… ne seront pas installées');
  if (!SALON) journal('DISCORD_SALON manquant : pas d\'annonces');
  connecter().catch(e => journal('démarrage', e.message));
  setInterval(() => activite(false), 60000).unref();
  return true;
}

module.exports = { demarrer, annoncer, publierNotes, notesDeVersion, actif: () => !!TOKEN };
