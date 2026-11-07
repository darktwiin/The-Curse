# The Curse — version de bureau (Steam)

Petite application Electron : une fenêtre qui ouvre le jeu en ligne (`URL_JEU` dans `src/config.js`) et branche Steam (overlay, pseudo, succès) via `steamworks.js`.
Les mises à jour du jeu arrivent par le serveur : on ne refait l'exécutable que si on change ce dossier.

## Commandes (dans ce dossier)
```
npm install          une seule fois
npm start            essayer sans fabriquer (THECURSE_URL=http://localhost:3000 pour un serveur local)
npm run fabriquer    fabrique dist/win-unpacked/TheCurse.exe (le dossier entier est à envoyer sur Steam)
```

## Avant la sortie sur Steam
- Remplacer `480` (Spacewar, l'appli de test de Valve) par ton vrai App ID dans `src/config.js` **et** `steam_appid.txt`.
- Changer `version` dans `package.json` à chaque nouvel exécutable.

## Si `npm run fabriquer` échoue sur « Cannot create symbolic link » (winCodeSign)
Windows refuse certains raccourcis du paquet d'outils. Extraire ce paquet une fois à la main dans
`%LOCALAPPDATA%\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0` (avec `node_modules\7zip-bin\win\x64\7za.exe x <le .7z du cache>`), puis relancer.
