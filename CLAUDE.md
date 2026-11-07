# The Curse (Royaume Maudit)

Jeu multijoueur dans le navigateur, style bullet hell (ROTMG). L'utilisateur débute : réponds en français simple.

## Technique
- Node.js ≥ 22.13, une seule dépendance : `ws` (WebSocket). Base de données : `node:sqlite` (intégré à Node).
- `public/index.html` : tout le jeu (client, un seul gros fichier). `public/index.html.js`, `wiki.html`, `mentions.html` à côté.
- `server.js` : sert la page et synchronise les joueurs (port `PORT`, 3000 par défaut ; données dans `DATA_DIR`).
- Anti-triche côté serveur : `arbitre.js` (vérifie les sauvegardes, lit les règles dans `public/index.html`), `butin.js` (tire le butin), `gardien.js` (copie du jeu sans affichage qui héberge les Plaines).
- `bot-discord.js` : bot Discord, ne démarre que si `DISCORD_TOKEN` est défini.
- `outils/generer-wiki.js` : régénère `public/wiki.html` (besoin de Playwright).
- `index.html` à la racine et `index-classique.html` : anciennes copies, pas servies par le serveur.

## Lancer en local
```
npm install
npm start
```
Puis ouvrir http://localhost:3000. Pas de tests automatiques : vérifier avec `node --check server.js` (et les autres .js) puis en jouant.

## Déploiement
- **Chaque push sur `main` met le jeu en ligne** (`.github/workflows/deploiement.yml` → SSH → `deploy/mettre-a-jour.sh` sur le VPS : `git pull`, `npm ci`, annonce aux joueurs, `systemctl restart royaume`). Donc : travailler sur une branche, ne fusionner dans `main` qu'avec l'accord de l'utilisateur.
- VPS OVH partagé avec un autre jeu (rpg3d / Nuit Blanche) : ne jamais toucher à ses processus, son dossier ni son port. The Curse vit dans `/opt/royaume`, données dans `/var/lib/royaume`.
- Détails : `GUIDE-MISE-EN-LIGNE.md`, `deploy/installer-serveur.sh`.

## Conventions
- Code et commentaires en français, même style compact que l'existant.
- Chaque version ajoute une section en haut de `CHANGELOG.md` (`## ver.0.0.X (fichiers touchés)`), texte pour les joueurs, puis lignes `(interne)` pour les détails techniques. Les notes sont publiées sur Discord.
- Si on change objets/monstres/zones dans `public/index.html`, penser à `arbitre.js`/`butin.js` (ils lisent ces règles) et à régénérer le wiki.
- Ne jamais committer : `node_modules/`, `data/`, les `.zip`, les fichiers de secrets (`tokens.txt`, `.env`).
