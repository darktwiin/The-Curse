// The Curse — application de bureau (Electron) pour Steam.
// La fenêtre affiche le jeu en ligne ; Steam (overlay, pseudo, succès) est géré ici, dans le processus principal,
// et la page n'en voit qu'une petite interface sûre (window.steam, voir preload.js).
'use strict';
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const C = require('./config');
const URL_JEU = process.env.THECURSE_URL || C.URL_JEU, STEAM_APP_ID = C.STEAM_APP_ID; // THECURSE_URL : pour essayer avec un serveur local
const ORIGINE = new URL(URL_JEU).origin;

// ---- Steam ----
let steam = null;
try {
  const sw = require('steamworks.js');
  steam = sw.init(STEAM_APP_ID);
  sw.electronEnableSteamOverlay(); // overlay Steam (Maj+Tab) par-dessus la fenêtre
  console.log('[steam] connecté :', steam.localplayer.getName());
} catch (e) {
  console.log('[steam] indisponible (Steam fermé, ou lancé hors de Steam) :', e.message);
}
ipcMain.handle('steam:infos', () => {
  if (!steam) return null;
  try { return { nom: steam.localplayer.getName(), id: String(steam.localplayer.getSteamId().steamId64), pays: steam.localplayer.getIpCountry() }; } catch { return null; }
});
// succès Steam : seuls des identifiants simples sont acceptés
ipcMain.handle('steam:succes', (_e, id) => {
  if (!steam || typeof id !== 'string' || !/^[A-Za-z0-9_]{1,64}$/.test(id)) return false;
  try { return steam.achievement.activate(id); } catch { return false; }
});
ipcMain.handle('steam:presence', (_e, texte) => {
  if (!steam || typeof texte !== 'string') return false;
  try { steam.localplayer.setRichPresence('status', texte.slice(0, 100)); return true; } catch { return false; }
});

// ---- fenêtre ----
// Overlay Steam : Chromium doit dessiner dans le même processus que la fenêtre
app.commandLine.appendSwitch('in-process-gpu');
app.commandLine.appendSwitch('disable-direct-composition');

function creer() {
  Menu.setApplicationMenu(null);
  const w = new BrowserWindow({
    width: 1400, height: 860, minWidth: 960, minHeight: 600, backgroundColor: '#0b0a12', title: 'The Curse',
    icon: path.join(__dirname, '..', 'build', 'icon.png'), show: false, autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false },
  });
  w.once('ready-to-show', () => { w.show(); });
  // F11 : plein écran · F5 : recharger · Ctrl+Maj+I : outils de développement
  w.webContents.on('before-input-event', (e, k) => {
    if (k.type !== 'keyDown') return;
    if (k.key === 'F11') { w.setFullScreen(!w.isFullScreen()); e.preventDefault(); }
    else if (k.key === 'F5') { w.webContents.reload(); e.preventDefault(); }
    else if (k.key === 'I' && k.control && k.shift) { w.webContents.toggleDevTools(); e.preventDefault(); }
  });
  // on reste sur le jeu : les autres liens (Discord, mentions…) s'ouvrent dans le navigateur
  const dehors = u => { try { return new URL(u).origin !== ORIGINE; } catch { return true; } };
  w.webContents.setWindowOpenHandler(({ url }) => { if (dehors(url)) { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; } return { action: 'allow', overrideBrowserWindowOptions: { autoHideMenuBar: true } }; });
  w.webContents.on('will-navigate', (e, url) => { if (dehors(url)) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });
  // serveur injoignable : page d'attente qui réessaie toute seule
  w.webContents.on('did-fail-load', (_e, code, _d, url, principal) => { if (principal && code !== -3) w.loadFile(path.join(__dirname, 'hors-ligne.html'), { query: { u: URL_JEU } }); });
  w.loadURL(URL_JEU);
  // essai automatique : THECURSE_CAPTURE=fichier.png enregistre une capture de la fenêtre après 8 s, puis ferme
  if (process.env.THECURSE_CAPTURE) setTimeout(async () => { try { require('fs').writeFileSync(process.env.THECURSE_CAPTURE, (await w.webContents.capturePage()).toPNG()); } catch (e) { console.error(e); } app.quit(); }, 8000);
}
app.whenReady().then(creer);
app.on('window-all-closed', () => app.quit());
