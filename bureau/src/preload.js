// Ce que la page du jeu peut demander à Steam (rien d'autre n'est exposé).
'use strict';
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('steam', {
  infos: () => ipcRenderer.invoke('steam:infos'),            // { nom, id, pays } ou null
  succes: id => ipcRenderer.invoke('steam:succes', String(id)), // débloque un succès Steam (identifiant défini dans Steamworks)
  presence: texte => ipcRenderer.invoke('steam:presence', String(texte)),
});
