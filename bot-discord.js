// The Curse — le bot Discord du jeu.
// Il tourne dans le même programme que le serveur du jeu : il lit donc directement les joueurs en ligne, le classement, etc.
// Il ne démarre que si DISCORD_TOKEN est renseigné ; sans ça, le jeu fonctionne exactement comme avant.
//
// Réglages (variables d'environnement, dans le fichier de configuration du service) :
//   DISCORD_TOKEN    la clé secrète du bot (à ne jamais partager ni mettre sur GitHub)
//   DISCORD_SERVEUR  l'identifiant du serveur Discord (pour y installer les commandes /…)
//   DISCORD_SALON    l'identifiant du salon où le bot poste ses annonces
//
// Aucune dépendance en plus : il parle à Discord avec « ws » (déjà utilisé par le jeu) et fetch (fourni par Node).
'use strict';
const WebSocket = require('ws');

const TOKEN = process.env.DISCORD_TOKEN || '';
const SERVEUR = process.env.DISCORD_SERVEUR || '';
const SALON = process.env.DISCORD_SALON || '';
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
function annoncer(texte, cle, delai) {
  if (!TOKEN || !SALON || !texte) return;
  if (cle) { const t = vues.get(cle) || 0; if (Date.now() - t < (delai || 60000)) return; vues.set(cle, Date.now()); }
  appel('POST', '/channels/' + SALON + '/messages', { content: String(texte).slice(0, 1900), allowed_mentions: { parse: [] } });
}

// ---------- commandes /… ----------
const COMMANDES = [
  { name: 'enligne', description: 'Combien de joueurs sont en jeu en ce moment' },
  { name: 'jouer', description: 'Le lien du jeu et du wiki' },
  { name: 'guerre', description: 'Quelle guilde tient quelle zone en ce moment' },
  { name: 'classement', description: 'Les 10 premiers du classement', options: [{ type: 3, name: 'type', description: 'Quel classement', required: false,
    choices: [{ name: 'Prestige', value: 'prestige' }, { name: 'Monstres tués', value: 'kills' }, { name: 'Pièces', value: 'or' }, { name: 'Maisons (cœurs)', value: 'maisons' }] }] },
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
function interaction(d) {
  if (!d || d.type !== 2 || !d.data) return;
  const texte = repondre(d.data.name, d.data.options);
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

function demarrer(acces) {
  jeu = acces;
  if (!TOKEN) { journal('pas de DISCORD_TOKEN : le bot Discord reste éteint'); return false; }
  if (!SERVEUR) journal('DISCORD_SERVEUR manquant : les commandes /… ne seront pas installées');
  if (!SALON) journal('DISCORD_SALON manquant : pas d\'annonces');
  connecter().catch(e => journal('démarrage', e.message));
  setInterval(() => activite(false), 60000).unref();
  return true;
}

module.exports = { demarrer, annoncer, actif: () => !!TOKEN };
