# The Curse — notes de mise à jour

## ver.0.0.90 (index.html, server.js ; wiki.html régénéré)
- **Raid du Dragon : départ cette nuit à 0h45 !** Le raid se lance tout seul à l'heure prévue ; l'affiche affiche le compte à rebours.
- (interne) Raids programmés côté serveur (RAID_PROGRAMMES, rattrapage 30 min, jamais deux fois) ; commande admin « raid N » = départ dans N minutes.

## ver.0.0.89 (index.html, server.js, arbitre.js, butin.js ; wiki.html régénéré)
- **Fini les monstres qui « se soignent ».** Le serveur ne rogne plus jamais vos dégâts : les monstres et les boss perdent la vie que vous leur retirez, point.
- **Les donjons sont hébergés par le joueur qui les lance**, comme les Plaines restent tenues par le serveur pour rester stables. Le serveur est plus léger et plus réactif.
- **Correctif de la potion de caractéristique** : poser une potion, en boire une autre puis reprendre la première faisait refuser la sauvegarde (et recharger le jeu). C'est réparé.
- **Plus de rechargement brutal** : si le serveur doit corriger ta sauvegarde, la correction s'applique en jeu, avec un message, sans recharger la page.
- (interne) Anti-triche : plus de Gardien dans les donjons (GARDIEN_DONJONS=1 pour les remettre) ; le Gardien des Plaines observe sans rogner ; vraisemblance des morts de boss côté serveur (coups annoncés par chacun, temps minimum selon le plafond de dégâts du groupe) ; l'arbitre accepte qu'une potion, un élixir, un œuf ou une croquette ramassés au sol remplacent ceux qui viennent d'être utilisés.

## ver.0.0.88 (index.html ; wiki.html régénéré)
- **Correctif** : une erreur pouvait s'afficher au chargement et empêcher le sac de s'afficher correctement.
- (interne) Icône manquante pour un consommable du contenu masqué (ICONS sans entrée) : même fiole que les potions de caractéristique, et repli sur une potion si un dessin manque un jour.

## ver.0.0.87 (index.html, server.js, arbitre.js, butin.js ; wiki.html régénéré)
- **Pêcher à plusieurs paie.** Le portail de la Vengeance sous-marine s'ouvre bien plus souvent quand on pêche côte à côte dans les Plaines : 3 fois plus à deux, 6 fois plus à trois, 10 fois plus à quatre et plus. Et il s'ouvre pour tout le groupe.
- **Démoniste** : l'anti-triche pouvait rogner une partie des dégâts de ses démons (surtout avec la Gemme de la Nova), ce qui faisait « remonter » la vie des boss. Son plafond de dégâts compte maintenant tous ses démons.
- **Le Vieux Navigateur** attend toujours les héros de niveau 25, près des portails du Village…
- (interne) Suite du contenu masqué : réglages de vie, de butin, de tirs et d'effets ; marqueurs de boss limités à l'île où l'on se trouve.

## ver.0.0.86 (index.html, server.js, arbitre.js, butin.js, generer-wiki.js ; wiki.html régénéré)
- **Arbre de la Brèche : l'emplacement de rune se débloque.** C'est maintenant un nœud comme les autres : il faut y mettre un point (le troisième en partant du Départ) avant de pouvoir sertir une rune. Les points et la rune sertie ont été rendus à tout le monde : replace-les, c'est gratuit.
- **Une rune sertie le reste.** Si ton héros meurt et retombe sous le niveau 20, sa rune continue d'agir. Seuls les autres nœuds de l'arbre attendent le retour au niveau 20.
- **Quelque chose se prépare pour les héros de niveau 25…** Un vieil homme s'est installé près des portails du Village. Il ne parle qu'à ceux qui sont allés au bout du prestige, et il a une drôle d'histoire à raconter. Une très grosse mise à jour arrive : on en reparle bientôt.
- **Correctif** : la téléportation du Mystificateur n'est plus comptée comme un « déplacement impossible » par l'anti-triche.
- (interne) Contenu de la prochaine extension embarqué et masqué du wiki (drapeau secret) ; anti-triche adapté aux nouveaux ordres de grandeur (plafond de dégâts suivant l'arme et la capacité, positions jusqu'à 5 000, zones de la seconde île).
- (interne) Arbre : save.breche[classe].av=3, nœud « 0,2 » ; runeDe côté serveur suit la même règle.

## ver.0.0.85 (index.html, server.js, arbitre.js, butin.js ; wiki.html régénéré)
- **Brèche : tomber, c'est sortir.** Si tu meurs dans la Brèche, tu es renvoyé au Village **sans rien perdre** (ni expérience ni équipement), mais tu ne peux plus entrer dans cette Brèche. Seul, elle se referme ; en groupe, tes compagnons peuvent encore la finir, et seuls ceux qui battent le gardien gagnent la rune et débloquent la difficulté suivante.
- **Brèche : le gardien ne se laisse plus grignoter de loin.** Si sa salle se vide, il reprend toute sa vie : il faut qu'au moins un joueur y reste.
- **L'arbre de la Brèche est redessiné.** On part du **Départ**, en bas, on monte jusqu'à la rune, puis on choisit ses branches : Rempart (+5 armure), Vitalité (+50 vie, +50 mana), Élan (+5 vitesse de déplacement), Force (+5 puissance). Une branche centrale mène à la **Suite**, qui s'ouvrira plus tard. **Tous les points ont été rendus : replace-les** (c'est gratuit).
- **Rune Carnivore** : 2 % de vol de vie au niveau 20 (au lieu de 1 %).
- **Monstre maudit** : il ne gagne plus de vie à chaque joueur qui passe près de lui (c'est ce qui donnait l'impression qu'il se soignait). Seuls ceux qui le combattent comptent : +10 % de vie par combattant, +30 % au plus. Sa prime passe de 100 à **200 pièces**.
- **Correctif** : poser au sol une potion de caractéristique, une grande potion, un œuf ou une croquette puis la ramasser ne fait plus refuser la sauvegarde.
- (interne) Anti-triche : l'onglet Triche et l'onglet Suspects affichent le personnage (pseudo et classe) à côté du compte ; « coups de loin » : seuil 18 → 22 cases, rien n'est compté dans les 6 s qui suivent un saut de position (téléportation, dash, retour au Village).
- (interne) Arbre : save.breche[classe].av=2 (remise à zéro à la première lecture) ; Brèche : message serveur « mort », B.morts ; arbitre : les consommables disparus sans trace d'usage sont notés comme posés au sol.

## ver.0.0.84 (index.html ; wiki.html régénéré)
- **Rune Carnivore rééquilibrée.** Elle était beaucoup trop forte : le vol de vie passe de 10 % à **1 %** des dégâts de l'arme au niveau 20 (0,05 % par niveau).

## ver.0.0.83 (index.html ; wiki.html régénéré)
- **Brèche : un repère sur la mini-carte.** La carte reste dans le brouillard, mais un point qui clignote indique le portail de l'étage (turquoise), puis la salle du gardien (rouge). De quoi foncer droit au but.
- **Brèche : il n'y a plus qu'un seul gardien.** Un double apparaissait parfois au dernier étage et tombait presque aussitôt.
- (interne) Le gardien est posé avec les autres monstres de l'étage (populateDungeon0, même identifiant chez tous) au lieu d'être ajouté par l'hôte ; sa vie est mise à l'échelle par brecheHote.

## ver.0.0.82 (index.html, server.js ; wiki.html régénéré)
- **La Brèche va plus vite : 3 étages au lieu de 5.** Plus de jauge à remplir : trouve le portail de chaque étage, et le **gardien** t'attend au bout du troisième.
- **Tu peux éviter les salles.** Rien ne t'oblige à tuer les monstres : file tout droit vers le portail si tu veux gagner du temps (et donc des chances d'améliorer tes runes).
- La barre en haut de l'écran montre l'étage en cours, puis la vie du gardien.
- (interne) BRECHE_ETAGES=3, d.brBoss sur le dernier étage, le gardien est posé par l'hôte de l'étage (brecheHote) ; durée minimale d'une course côté serveur 30 s → 15 s.

## ver.0.0.81 (index.html ; wiki.html régénéré)
- **Filet de sécurité au chargement.** Si le jeu rencontre une erreur en démarrant, l'écran-titre et le bouton « Jouer » fonctionnent quand même, et un bandeau rouge affiche l'erreur en haut de l'écran : envoie-en une capture sur le Discord, ça permet de corriger tout de suite.
- (interne) Démarrage sous try/catch (repli sur le choix du héros), petit script « data-filet » avant le script principal, version de l'écran-titre écrite sans attendre le jeu.

## ver.0.0.80 (index.html ; wiki.html régénéré)
- **Correctif urgent : le bouton « Jouer » ne répondait plus.** Depuis la 0.0.79, les joueurs qui avaient déjà un héros restaient bloqués sur l'écran-titre. C'est réparé, rien n'a été perdu : tes héros, ton or et tes objets sont intacts.
- (interne) Le démarrage du jeu s'exécutait avant la définition des fonctions de la Brèche (runeDmgK appelée par S()) : il est déplacé tout en bas du script.

## ver.0.0.79 (index.html, server.js, butin.js, arbitre.js ; wiki.html régénéré)
- **La Brèche : un nouveau contenu de fin de jeu, seul ou à plusieurs.** Au niveau 20, le **Veilleur de la Brèche** apparaît au Village, à gauche de l'entrée.
  - Un donjon à étages (5 au plus), en labyrinthe, sur un thème tiré au hasard parmi trois : le **Sanctuaire runique**, le **Nid de la Corruption** et le **Cœur de l'Orage**. Neuf nouveaux monstres, trois nouveaux gardiens, une nouvelle musique.
  - Chaque monstre tué remplit une jauge, en haut de l'écran. Pleine (comptez deux à trois étages), le **gardien** apparaît. Sa mort ouvre la sortie et dresse le **pilier des runes**.
  - **20 difficultés** : il faut en terminer une pour ouvrir la suivante.
  - **Le temps compte** : gardien vaincu en moins d'1 minute, 4 chances d'améliorer une rune · 2 minutes, 3 chances · 3 minutes, 2 · 5 minutes, 1 · au-delà, aucune.
  - La mort n'y fait rien perdre : on reprend au début de l'étage, et le temps continue.
  - **À plusieurs** : le meneur ouvre la Brèche, les joueurs proches du Veilleur ont 15 secondes pour accepter, tout le monde part ensemble. Les monstres et le gardien gagnent 30 % de vie par joueur.
- **Dix runes, vingt niveaux chacune.** Chaque Brèche terminée donne une rune que ta classe n'a pas encore. Leur effet grandit régulièrement jusqu'au niveau 20 :
  - **Longue-vue** : +1 case de portée · **Véloce** : vitesse d'attaque ×2, dégâts ÷2 · **Puissant** : dégâts ×2, vitesse d'attaque ÷2
  - **Carnivore** : 10 % des dégâts de l'arme te soignent · **Ami des bêtes** : bonus du familier +50 % · **Savant** : +25 % d'expérience (gloire comprise)
  - **Duc** : +25 % de pièces · **Dans le mille** : 10 % de coups critiques (150 % des dégâts, en rouge) · **Phantom** : dash sans recharge (au niveau 20 seulement) · **Pape** : +30 % de soins reçus
  - Une rune s'améliore à coup sûr si la difficulté vaut au moins son niveau, à 20 % avec un niveau de retard, à 5 % avec deux, jamais au-delà.
- **L'arbre.** Une seule rune agit à la fois : on la fait glisser au centre de l'arbre. Autour, jusqu'à 15 points à placer de proche en proche (1 par niveau de 21 à 25, 1 par rune au niveau 20) : +10 vie, +10 mana, et quelques nœuds rares (+5 puissance, +5 vitesse d'attaque, +5 vitesse de déplacement, +50 vie et mana). Redistribuer coûte 300 pièces.
- Runes et arbre sont propres à chaque classe. La mort définitive ne les efface pas, mais l'arbre reste scellé tant que le héros n'a pas retrouvé le niveau 20.
- **Maîtrise de classe** : plus aucun bonus d'expérience ne la remplit plus vite (ni boost, ni objectif de la semaine, ni rune) — seule l'expérience de base des monstres compte.

## ver.0.0.78 (index.html, arbitre.js ; server.js inchangé depuis la 0.0.72 ; wiki.html régénéré)
- **Herboriste : les grandes potions.** Au niveau 15 du métier, deux nouvelles recettes : la **Grande potion de vie** et la **Grande potion de mana**, qui rendent 250 points (au lieu de 120).
  - Recette : les deux plantes habituelles (Sanguine + Racine vermeille, ou Azurine + Lunaire), et un **Lys des abîmes** à la place du Trèfle doré.
  - Le **Lys des abîmes** est une plante rare : on n'en trouve qu'un ou deux par grand donjon des Terres Brûlées et Désolées (les six grands donjons). Il brille en violet et se cueille en passant dessus ; chaque joueur du groupe cueille le sien.
  - Les touches F et V choisissent toutes seules : la petite potion si elle suffit, la grande s'il manque plus de 150 points.

## ver.0.0.77 (index.html seulement ; server.js inchangé depuis la 0.0.72 ; wiki.html régénéré)
- **Mort définitive : les sacs à dos achetés sont conservés.** Le héros repart toujours de zéro (niveau, équipement, potions de caractéristiques, contenu des sacs), mais il garde son 2e et son 3e sac, vides.

## ver.0.0.76 (index.html, arbitre.js ; server.js inchangé depuis la 0.0.72 ; wiki.html régénéré)
- **Prestige : le niveau 25 devient accessible.** Les niveaux 21 à 25 coûtent maintenant 200, 300, 400, 500 et 1 000 points de prestige (2 400 en tout, au lieu de 18 000).
- En échange, le niveau maximum se débloque **classe par classe** : le prestige dépensé chez le Gardien du Prestige vaut pour la classe que tu joues à ce moment-là. Pour amener une autre classe au niveau 25, il faut repasser ses cinq paliers.
- Les niveaux maximum déjà achetés avec l'ancien système restent acquis, pour toutes tes classes.
- **Maîtrise de classe.** Au niveau 25, une nouvelle jauge violette apparaît sous la gloire : la maîtrise. Elle se remplit avec l'expérience, en même temps que la gloire, et demande 680 000 points — dix fois le chemin du niveau 1 au niveau 25.
  - **Mourir vide la jauge.**
  - Pleine, elle donne le titre **« ⚜ Classe Maîtrisé ⚜ »** (Mage Maîtrisé, Guerrier Maîtrisé…), acquis pour toujours et annoncé à tout le serveur.
- **Monstre maudit** : il n'apparaît plus que du Marais Putride aux Terres Brûlées (zones 3 à 6), et jamais près d'une route.

## ver.0.0.75 (index.html, butin.js, gardien.js ; server.js inchangé depuis la 0.0.72 ; wiki.html régénéré)
- **Monstre maudit des Plaines.** Toutes les 10 minutes, un monstre ordinaire est frappé par la malédiction — n'importe où de la Plage des Naufragés aux Terres Brûlées, jamais dans les Terres Désolées. Il n'y en a qu'un à la fois.
  - Il garde son apparence, mais **double de taille** et s'entoure d'une **aura violette**.
  - Il prend la force du **Dévoreur d'Étoiles** : mêmes points de vie, mêmes dégâts, même armure.
  - Il reçoit **3 attaques tirées au hasard parmi 10 nouvelles** (Couronne brisée, Faux tournoyante, Traque, Pluie de malédictions, Éventail, Serpents, Double anneau, Mines, Croix, Déferlante) : deux monstres maudits ne se battent jamais pareil.
  - Il est **marqué en violet sur la carte**, et son apparition est annoncée à tous les joueurs des Plaines.
  - Récompense : **1 potion de caractéristique au hasard et 100 pièces** pour chaque joueur qui lui a infligé au moins 5 000 dégâts. Le tableau des dégâts s'affiche à sa mort.
- **Wiki** : le Dévoreur d'Étoiles apparaît enfin dans la liste des monstres de l'Observatoire Céleste, et le monstre maudit a sa fiche.

## ver.0.0.74 (index.html seulement ; server.js inchangé depuis la 0.0.72 ; wiki.html régénéré)
- **Portail de l'Avant-poste des Terres Désolées** : il ne s'achète plus. Il s'ouvre pour tous tes héros dès que l'un d'eux atteint le niveau 20, et il le reste ensuite. Chaque passage coûte 20 pièces.

## ver.0.0.71 (index.html, butin.js, gardien.js ; server.js inchangé depuis la 0.0.69 ; wiki.html régénéré)
- **Les Plaines Sauvages changent de forme.** L'île n'est plus un disque : c'est une longue terre qui monte du sud au nord. On débarque sur la Plage des Naufragés, tout en bas, et on remonte zone après zone — Plaines d'Émeraude, Marais Putride, Forêt des Murmures, Canyon de Rouille, Terres Brûlées, Terres Désolées — par des passages plus étroits entre chaque région.
- **Le nord est beaucoup plus grand** : les Terres Brûlées et les Terres Désolées font plus de deux fois leur ancienne surface, avec plus de monstres, pour que les héros de haut niveau ne se marchent plus dessus. Les zones de départ sont plus petites : on y croise plus vite d'autres joueurs.
- Une grande route de briques remonte toute l'île ; dans le nord, des routes de côté et des traverses permettent de circuler vite.
- **Portails des Plaines Sauvages** : le portail du Village ouvre maintenant une liste de destinations.
  - **Plage des Naufragés** : gratuit, comme avant.
  - **Avant-poste des Terres Désolées** : 1 000 pièces, une fois pour toutes (pour tous tes héros). On arrive directement au début des Terres Désolées.
  - **Portail scellé** : futures zones à venir.
- **Avant-poste des Terres Désolées** : une zone sûre, marquée sur la carte. Quatre gardes invincibles abattent les monstres qui s'en approchent (sans butin ni expérience). À l'intérieur, rien ne peut te blesser — mais on ne peut ni attaquer ni lancer de capacité.
- La mini-carte et la grande carte (M) suivent la nouvelle forme de l'île. La carte déjà découverte repart de zéro.
- Les deux boss (Roi Bouffon et Béhémoth d'Obsidienne) apparaissent maintenant au nord de l'île, dans les Terres Brûlées ou les Terres Désolées.
- (interne) L'île est décrite par une liste de points (ILE) et chaque zone par ses rangées (ZONES[i].y) : ajouter une zone au nord revient à ajouter une ligne. Le contrôle « monstre hors de sa zone » du serveur suit la nouvelle carte.

## ver.0.0.70 (index.html seulement ; server.js inchangé depuis la 0.0.69 ; wiki.html régénéré)
- **Vitesse d'attaque et vitesse de déplacement : fin des plafonds durs.** Jusqu'à 70 (attaque) et 60 (déplacement), rien ne change. Au-delà, chaque point compte maintenant pour un tiers au lieu de ne plus compter du tout : s'optimiser continue de payer, sans rendre une classe démesurée. La fiche de statistiques affiche le total et son effet réel.
- **Sort du Rocher** (Mage) : l'écran ne tremble plus sans fin, et la longue recharge reste attachée à cette relique — changer de capacité ne la transporte plus, y revenir ne la remet pas à zéro. Même règle pour toutes les Reliques de la Tour.
- **Nouveaux états affichés**, avec leur icône : Épines (Heaume aux Épines), Fureur (Miroir de Fureur et Voile du Carnage), Hâte (Pacte de Hâte). On voit enfin combien de temps l'effet dure.
- **Baguette de l'Étoile Filante** (Prêtre) : les monstres touchés sont affaiblis 4 secondes — leurs tirs font 10 % de dégâts en moins (nouvel état « Affaibli »).
- **Pacte de Hâte** (Démoniste) : le démon a sa propre apparence, coûte 250 de mana et reste 14 secondes.

## ver.0.0.69 (index.html, server.js, butin.js, gardien.js ; wiki.html régénéré)
- **Serveurs de 100 joueurs** : chacun des trois serveurs (Roi Bouffon, Léviathan, Dévoreur d'Étoiles) accueille maintenant 100 joueurs au lieu de 16. La fontaine du Village affiche le nombre de joueurs sur 100.
- Pour tenir cette foule, le serveur n'envoie plus à chacun que ce qui l'entoure : les joueurs proches en temps réel, les joueurs éloignés ou ailleurs une fois par seconde, et seulement les monstres qui sont autour de soi.
- (interne) Gardien allégé : grille des joueurs pour les monstres, monstres endormis loin de tout joueur, copies en réserve ralenties, plus de relais des autres scènes vers le Gardien. Témoin des morts corrigé (les 120 dernières au lieu des 40 premières).

## ver.0.0.68 (index.html, server.js, arbitre.js, gardien.js ; wiki.html et wiki-modele.html mis à jour)
- **Mode maudit** : le pacte peut maintenant être rompu en retournant parler au Passeur, au Village (jamais une fois mort). Il reste propre à chaque héros.
- **Héros maudits** : un crâne violet flotte au-dessus de leur tête, visible de tous les joueurs.
- **Serveur plus solide pour l'arrivée de nouveaux joueurs** : les échanges entre le jeu et le serveur sont regroupés, ce qui permet d'accueillir environ deux à trois fois plus de joueurs en même temps ; créer un compte ou se connecter ne ralentit plus les autres.
- **Compagnons du Village** : les personnages qui tiennent compagnie quand le serveur est calme se retirent quand il y a du monde — la moitié à partir de 10 joueurs connectés, tous à partir de 20.
- (interne) Sécurité : une livraison en attente ne peut plus être créditée plusieurs fois ; la première sauvegarde d'un compte neuf est contrôlée comme les autres ; la Clef de la Tour est réellement consommée à l'entrée ; une seule récompense de raid par compte ; un échange ne peut plus être annulé après encaissement ; le classement exige un compte et ne dépasse jamais la sauvegarde validée ; prises du tournoi de pêche liées aux pêches vues par le serveur ; 12 connexions au plus par adresse ; nom du gagnant du concours échappé.

## ver.0.0.67 (index.html, server.js, arbitre.js, butin.js ; wiki.html et wiki-modele.html mis à jour)
- **Tour des Chevaliers : dix nouveaux gardiens de palier.** Fini les boss de donjon recyclés : la Tour a maintenant ses propres seigneurs chevaliers, tirés au hasard — le Capitaine de la Garde, le Bourreau, le Croisé, la Dame de Fer, le Chevalier Écarlate, le Chevalier d'Émeraude, le Seigneur d'Azur, le Roi-Chevalier, le Chevalier Spectral et le Connétable de la Nuit.
- **Chaque palier a son épreuve**, quel que soit le gardien : la Garde (palier 5), le Tournoi (10), le Siège (15), le Jugement (20), le Dernier Rempart (25). Les attaques changent et se durcissent à chaque palier, et à partir du palier 10 le gardien appelle des chevaliers en renfort quand il faiblit.
- **Le Passeur et le mode maudit.** Quand un héros atteint le niveau 20, un personnage sombre l'appelle au Village. Il propose un pacte, héros par héros et sans retour : **toute mort devient définitive**. En échange : 1 % de potion de caractéristique sur chaque monstre de donjon et 5 % sur chaque boss de donjon, toutes les chances actuelles de potion de caractéristique doublées, 1 % de relique sur chaque monstre de l'Observatoire Céleste et de l'Horloge Brisée, et 5 % de dégâts en plus — infligés comme subis.

## ver.0.0.66 (index.html seulement ; server.js inchangé depuis la 0.0.64 ; wiki.html régénéré)
- **La Vengeance sous-marine** (donjon caché de la pêche, 1 chance sur 250) : le portail s'ouvre maintenant à quelques pas du pêcheur, sur la terre ferme, au lieu de l'aspirer dedans à la prise suivante. Il reste ouvert 2 minutes et tout le monde peut le prendre.
- **Coffre de livraison** de la maison : nouvelle apparence, un colis ficelé d'un ruban rouge.

## ver.0.0.65 (index.html seulement ; server.js inchangé depuis la 0.0.64 ; wiki.html régénéré)
- **Heaume aux Épines** (Relique de la Tour) : les dégâts renvoyés passent de 100 % à 2000 % des dégâts subis.

## ver.0.0.64 (index.html, server.js, arbitre.js, butin.js ; wiki.html, wiki-modele.html et generer-wiki.js mis à jour)
- **Miroir des Mille Reflets** (relique du Mystificateur) refait : il ne laisse plus de bombe. Il ne donne plus aucune caractéristique, mais ne coûte que 10 de mana et n'a plus aucun temps de recharge : la téléportation se relance aussitôt.
- **Carquois des Comètes** (relique de l'Archer) : sur un boss, chaque flèche retire 5 % de la vie qu'il lui reste (au lieu de 15 % de sa vie totale).
- **Clef de la Tour** : Chronos en lâche une, une fois sur deux. Elle ouvre la Tour des Chevaliers, au Village.
- **Nouvelle famille : les Reliques de la Tour** (violettes), gagnées aux paliers de la Tour des Chevaliers. Une par arme et par capacité, et chacune change la façon de jouer :
  - **Lame de l'Aura** (épée) : ne tire pas, blesse tout ce qui t'entoure.
  - **Arc du Guetteur** : une seule flèche, très lente à tirer, qui inflige 800 % des dégâts et porte à 15 cases.
  - **Bâton des Brasiers Lointains** : chaque attaque fait éclater une gerbe de projectiles là où tu vises, comme le sort du Mage.
  - **Baguette de l'Étoile Filante** : fait tomber une étoile sous ton curseur, lente mais très puissante, qui frappe en zone.
  - **Dard du Lointain** (dague) : un seul projectile, qui porte à 12 cases, dégâts réduits.
  - **Gemme de la Nova** : le démon tire tout autour de lui à chaque attaque, dégâts faibles.
  - **Égide du Dernier Souffle** (bouclier) : consomme tout ton mana et te rend 50 % de ta vie.
  - **Pacte de Hâte** : un démon immobile (un seul à la fois) qui augmente la vitesse d'attaque de tous les joueurs autour de lui.
  - **Heaume aux Épines** : pendant 10 secondes, chaque coup que tu subis renvoie 2000 % de ses dégâts à l'ennemi.
  - **Sort du Rocher** : un rocher tombe du plafond, lentement — beaucoup de mana, longue recharge, énormes dégâts de zone.
  - **Carquois des Mille Maux** : une seule flèche qui applique tous les effets négatifs (poison, paralysie, armure brisée, vulnérabilité).
  - **Grimoire de l'Instant Sacré** : rend invulnérables 0,5 seconde tous les joueurs autour de toi.
  - **Miroir de Fureur** : ne téléporte plus, mais augmente fortement les dégâts et la vitesse d'attaque pendant 5 secondes.
  - **Voile du Carnage** : ne rend plus invisible, mais augmente fortement les dégâts et la vitesse d'attaque pendant 5 secondes.
- **Armures et anneaux de relique** : Chronos peut maintenant lâcher une armure ou un anneau de Chronos (20 % de caractéristiques de plus que les reliques turquoise), et la Tour une armure ou un anneau du Chevalier Noir (40 % de plus).

## ver.0.0.63 (index.html, server.js, butin.js ; wiki.html et wiki-modele.html mis à jour)
- **L'Horloge Brisée devient un vrai labyrinthe** : une cinquantaine de salles qui partent dans tous les sens, avec des embranchements, quelques boucles et de vrais culs-de-sac. La salle de Chronos peut se trouver n'importe où, parfois tout près de l'entrée, mais le chemin pour y arriver est long.
- **Carte de l'Horloge Brisée** : le donjon est caché. La carte ne dévoile que la salle ou le couloir où l'on se trouve, jamais les salles voisines.
- **Œufs de familier** : la chance dépend maintenant de la difficulté de l'endroit, monstres et boss confondus — 0,15 % sur la Plage, dans les Plaines d'Émeraude et au Terrier des Gobelins · 0,25 % dans le Marais Putride, la Forêt des Murmures et les donjons intermédiaires · 0,35 % dans le Canyon de Rouille, les Terres Brûlées et les grands donjons · 0,4 % dans les Terres Désolées · 0,5 % dans l'Observatoire Céleste, l'Horloge Brisée et sur les deux boss du centre des Plaines.
- **Boss** : +20 % de vie pour chaque joueur différent venu se battre contre lui. C'était déjà le cas pour les boss d'arène ; les gardiens de l'Observatoire et les boss hors arène sont maintenant comptés de la même façon, et un joueur qui repart ne fait pas redescendre la vie du boss.
- **Carquois des Comètes** (relique de l'Archer) : sur Chronos, chaque flèche retire 5 % de sa vie au lieu de 15 %.
- **Baguette de Miséricorde** : la zone de soin rend 5 % de la vie au lieu de 3 %.
- **Dagues** : dégâts +15 % (Mystificateur et Assassin, toutes les dagues, celles déjà possédées comprises).
- **Mage** : dégâts des bâtons −10 % et dégâts de l'explosion du sort −20 %.
- (interne) Titre Alpha testeur : le compte « Laturne 19 » est ajouté ; les noms de compte sont comparés sans majuscules ni espaces.

## ver.0.0.62 (index.html, server.js, arbitre.js ; wiki.html régénéré)
- **Mystificateur** : la téléportation se recharge beaucoup plus vite — 2 s au Tier 0, puis 0,3 s de moins à chaque tier, jusqu'à 0,2 s au Tier 6 et 0,1 s pour le Tier 7, la relique et le Miroir de Frénésie.
- **Mystificateur** : ses miroirs renforcent maintenant l'attaque tant qu'ils sont équipés — +2 puissance et +1 vitesse d'attaque par tier (Tier 6 : +14 / +7 ; Tier 7 et reliques : +16 / +8). Les miroirs déjà possédés en profitent aussi.
- **Wiki** : la fiche de chaque capacité décrit maintenant son effet (soin, explosion, invocation…), et chaque relique indique ce qu'elle apporte en plus — par exemple le Pacte des Abysses, qui invoque un démon gardien.

## ver.0.0.61 (index.html seulement ; server.js inchangé depuis la 0.0.56 ; wiki.html régénéré)
- **Zones qui se vidaient** (Canyon de Rouille surtout) : un monstre entraîné hors de sa zone par un joueur y restait pour toujours et comptait encore pour sa zone d'origine, qui ne se repeuplait plus. Il est maintenant retiré dès que plus personne ne le voit, et sa zone le remplace.

## ver.0.0.60 (index.html seulement ; server.js inchangé depuis la 0.0.56 ; wiki.html régénéré)
- **Mort** : fermer puis rouvrir le jeu ne permet plus d'éviter la perte de niveaux. La mort est enregistrée tout de suite, et l'écran de choix revient tant que le joueur n'a pas choisi.

## ver.0.0.59 (index.html : numéro de version seulement ; wiki.html régénéré ; server.js inchangé depuis la 0.0.56)
- **Wiki remis à jour** : butin (les potions de vie et de mana ne tombent plus, reliques turquoise uniquement sur le Dévoreur d'Étoiles et reliques dorées uniquement sur Chronos, ressources de talisman, couleurs des sacs), règles de la mort et du prestige, frais de l'hôtel des ventes, liaison Discord, et toutes les captures du guide « Bien débuter » refaites avec les nouveaux dessins.

## ver.0.0.58 (index.html seulement ; server.js inchangé depuis la 0.0.56 ; wiki.html régénéré)
- **Boss qui disparaissaient** en plein combat (Dévoreur d'Étoiles, Pharaon, Gardiens célestes…) : corrigé. Le boss ne disparaît plus de l'écran tant que le serveur le voit en vie, et sa barre de vie se recale sur la vraie valeur.
- **Carquois relique de l'Archer** : ses dégâts en pourcentage de la vie sont maintenant bien comptés sur les boss.
- **Portraits** : la barre de vie, les listes de joueurs et le choix du héros affichent les nouveaux dessins, avec le skin choisi dans la barre de vie.
- (interne) L'hôte n'annonce plus jamais un monstre vivant à 0 point de vie (arrondi), envoie les boss en premier dans ses messages, et un boss absent d'un message a 3 secondes de grâce avant d'être retiré.

## ver.0.0.57 (index.html seulement ; server.js inchangé depuis la 0.0.56 ; wiki.html régénéré)
- **Liaison Discord** : la fenêtre affiche maintenant le code seul, avec un bouton « Copier ». Sur Discord, on tape la commande `/lier` puis on colle le code.

## ver.0.0.56 (index.html, server.js, bot-discord.js ; wiki.html régénéré)
- **Gardiens célestes** redessinés : le Bélier, le Scorpion, le Serpent et le Lion du donjon céleste ont un nouveau dessin animé, avec une pose d'attaque.
- **Potions de caractéristique** redessinées une nouvelle fois : un orbe cerclé d'or sur son socle, mêmes couleurs qu'avant.
- **Reliques** : les monstres n'en donnent plus. Les reliques bleues tombent uniquement sur le Dévoreur d'Étoiles, les reliques dorées uniquement sur Chronos.
- **Discord** : les commandes du bot se tapent dans leur salon dédié, et un salon de notes de mise à jour se remplit tout seul à chaque nouvelle version.

## ver.0.0.55 (index.html, server.js, butin.js, bot-discord.js ; wiki.html régénéré)
- **Bouton Discord** au Village (en bas à droite) : lien d'invitation et liaison du compte de jeu avec Discord (code donné en jeu, commande `/lier` sur Discord). Le bouton disparaît une fois le compte lié.
- **Bot Discord** : commandes `/lier`, `/ticket` (fil privé avec l'équipe) et `/fermer` ; rôle donné automatiquement à la liaison ; annonces des reliques trouvées et des poissons légendaires, dans leurs propres salons.
- (interne) Bouton admin « 🤖 Tester le bot Discord ».
- **Reliques** : elles ne s'échangent plus entre joueurs, mais se vendent toujours à l'hôtel des ventes.
- **Sacs au sol** : brun pour les objets de tier 0 à 6, violet pour le Tier 7, orange pour les potions de caractéristique, noir pour les reliques (plus de sac blanc).
- **Infobulle** : survoler un sac avec la souris affiche son contenu.

## ver.0.0.54 (server.js + nouveau fichier bot-discord.js ; index.html : numéro de version seulement ; wiki.html régénéré)
- **Bot Discord du jeu** (éteint tant que DISCORD_TOKEN n'est pas renseigné sur le serveur) :
  - affiche le nombre de joueurs en ligne sous son nom ;
  - commandes `/enligne`, `/classement`, `/guerre`, `/jouer` ;
  - annonce dans un salon : raid de guilde lancé et son podium, boss du monde vaincu, objectif de la semaine atteint, Roi de la pêche couronné, redémarrage imminent, nouvelle version en ligne.
- Aucune dépendance en plus.

## ver.0.0.53 (index.html, server.js, arbitre.js ; wiki.html régénéré)
- (interne) **Pack de démarrage** : caché aux joueurs tant que la boutique payante n'est pas ouverte (seuls les admins le voient, et un joueur à qui un admin a ouvert le droit). Toujours un seul par compte. Il contient maintenant aussi 1 boost d'expérience, gardé en réserve et activable gratuitement à l'Échoppe (onglet Cursite).
- **Coffre de livraison** déplacé dans une petite alcôve, juste sous le portail d'arrivée de la maison.
- **Pêche** : plus un poisson est rare, plus il a de chances d'être gros (donc de gagner le tournoi). La Carpe koï d'or maudite pèse maintenant de 60 à 220 kg, pour qu'un légendaire du lac puisse battre un Esturgeon.
- **Métier de pêcheur** jusqu'au niveau 20 : chaque prise donne des points (10 à 80 selon la rareté). Les chances passent de 58 / 27 / 10 / 4 / 1 % au niveau 1 à 30 / 30 / 22 / 13 / 5 % au niveau 20 (commun, peu commun, rare, épique, légendaire). Niveau et chances affichés dans le tableau de pêche.
- (interne) **Anti-triche** : la Cursite donnée par le serveur reste due tant que le jeu ne l'a pas ajoutée (une sauvegarde partie au mauvais moment pouvait faire refuser une livraison).

## ver.0.0.52 (index.html, server.js, arbitre.js, butin.js ; wiki.html régénéré)
- **Coffre de livraison** : un coffre bleu cerclé d'or dans la maison, près de l'entrée. Fermé quand il est vide, il s'ouvre dès qu'il contient quelque chose. On ne peut rien y déposer. Les cadeaux du jour et les achats de la boutique Cursite (œuf, pack) y arrivent ; un message dans le chat et au milieu de l'écran le rappelle à chaque livraison. Bouton « Tout prendre ».
- (interne) **Pack de démarrage (5 €)** dans la boutique Cursite : 1000 Cursite, un équipement Tier 6 complet pour le héros de son choix, 2 potions de chaque caractéristique, 3 œufs. Un seul par compte. Le paiement en jeu n'est pas encore branché : un admin ouvre le droit au pack (panneau admin, bouton « 📦 Pack de démarrage » sur le joueur), puis le joueur le récupère à l'Échoppe en choisissant son héros.
- **Monstres plus grands** : +30 % dans les Terres Brûlées, +50 % dans les Terres Désolées.
- **Tous les monstres** se tiennent 20 % plus près du joueur.
- **Spectre du Vide** : à chaque attaque, 1 chance sur 5 de rapetisser (petite animation) et de gagner 30 % de vitesse pendant 6 secondes.
- **Chimère** redessinée (ailes de dragon, tête de bouc, queue-serpent). Ses projectiles donnent le nouvel état **Halluciné** : pendant 3 secondes, les monstres, les boss et les autres joueurs changent d'apparence au hasard, seulement sur l'écran du joueur touché.
- **Sentinelle** : ses tirs aveuglent 1 seconde. **Démon** : ses tirs brûlent 2 secondes.
- **Nouveau monstre** des Terres Désolées : la Vipère des Désolations, un serpent vert dont le venin empoisonne (dessin animé, attaque et projectile à elle).

## ver.0.0.51 (index.html seulement ; server.js inchangé depuis la 0.0.49 ; wiki.html régénéré)
- **Mage** : le héros de base et le Pyromancien sont redessinés (grand chapeau à pointe courbée pour le Mage ; capuche, visage dans l'ombre et crête de flammes pour le Pyromancien).
- **Mystificateur** : le bonnet à pointes est remplacé par des oreilles de renard, sur le héros de base et sur ses deux skins.
- **Anciens skins premium** redessinés dans le style des nouveaux héros : Champion des flammes, Seigneur de la mort, Rôdeur sylvestre, Haut prêtre, Illusionniste, Lame du Néant, Chevalier noir, Démon d'azur. Le Paladin d'ivoire et le Démon de cendre ont maintenant leur propre dessin.
- **Plantes** : elles poussent aussi dans les Plaines d'Émeraude, avec la même densité que dans la Forêt des Murmures.

## ver.0.0.50 (index.html seulement ; server.js inchangé depuis la 0.0.49 ; wiki.html régénéré)
- **Héros redessinés** : les huit héros de base sont refaits en double résolution (casque à plumet du Guerrier, chapeau pointu du Mage, capuche et bandoulière de l'Archer, étole dorée du Prêtre, bonnet à grelots du Mystificateur, écharpe de l'Assassin, heaume et écu du Porte-bouclier, cornes et crocs du Démoniste).
- **Huit nouveaux skins** à la boutique (500 Cursite, un par héros) : Seigneur du Nord, Pyromancien, Traqueur des neiges, Oracle de jade, Arlequin écarlate, Vipère des sables, Paladin d'ivoire, Démon de cendre.
- **Plantes** : elles ne poussent plus que dans la Forêt des Murmures, où elles sont 30 % plus denses qu'avant.
- **Herboriste** : son étal du hall est remplacé par une échoppe dans les prés du sud du Village, juste au-dessus des enclos.

## ver.0.0.49 (server.js, butin.js et arbitre.js modifiés ; wiki.html régénéré)
- **Herboriste** : cinq plantes au lieu de deux. Potion de vie = Sanguine + Racine vermeille + Trèfle doré ; potion de mana = Azurine + Lunaire + Trèfle doré (le Trèfle sert aux deux). Chaque potion fabriquée rapporte 10 points de métier ; le métier monte jusqu'au niveau 20 (30 × niveau pour passer au suivant). Le niveau ne donne encore aucun avantage.
- **Tour des Chevaliers** : scellée. Il faut une « Clef de la Tour », consommée à l'entrée. La clef n'a pas encore de source en jeu : elle se donne depuis l'onglet Objets du panneau admin, et un bouton « Tour des Chevaliers » dans le panneau admin permet d'y entrer directement.
- **Talismans des deux boss du centre** : le Roi Bouffon lâche le Grelot du Bouffon (Talisman du Roi Bouffon : +6 vitesse d'attaque, +4 vitesse de déplacement) et le Béhémoth le Cœur d'obsidienne (Talisman du Béhémoth : +100 vie, +4 puissance), 20 % de chance, 10 ressources par talisman.
- **Table à dessin** : le logo du jeu (100 × 100) est posé une fois sur la toile au démarrage du serveur ; la table reste libre, chacun peut redessiner dessus. Les admins ont un bouton « Reposer le logo ».
- **Anti-triche resserré** :
  - l'or ne peut plus apparaître sans raison : la marge passe de 450 à 15 pièces par minute. Les pièces viennent du serveur (monstres, hôtel des ventes, raid), des ventes au marchand, et des quêtes, dont la récompense n'est acceptée qu'au moment où la quête est validée, une seule fois ;
  - un consommable doit maintenant être justifié : donné par le serveur, cadeau de connexion, kit d'un nouveau héros, fabriqué avec des plantes, ou acheté et payé (potion 5 pièces, croquette 500, œuf 300 pièces ou 50 Cursite, potion de caractéristique du jour 50 pièces). Une potion de caractéristique, un œuf ou une clef inventés sont refusés.

## ver.0.0.48 (server.js, butin.js et arbitre.js modifiés ; wiki.html régénéré)
- **Herboriste** : deux plantes poussent dans les Plaines Sauvages, la Sanguine (rouge) et l'Azurine (bleue). On les cueille en passant dessus ; elles vont dans une liste à part (bouton « Ressources et talismans »), pas dans le sac. Elles repoussent ailleurs toutes les 10 minutes. À l'atelier de l'herboriste, au Village, 3 Sanguines donnent une potion de vie et 3 Azurines une potion de mana.
- **Les potions de vie et de mana ne tombent plus des monstres ni des boss.** Le marchand en vend toujours.
- **Guerre des guildes** : dans chaque zone des Plaines, chaque heure, la guilde qui a tué le plus de monstres prend la zone ; ses membres y gagnent +10 % d'or et d'expérience pendant l'heure suivante, puis les compteurs repartent de zéro. Un panneau apparaît dans les Plaines (zone tenue, guilde en tête, score de sa guilde, temps restant) ; un clic ouvre le détail des sept zones.
- **Tour des Chevaliers** : nouveau portail au Village, à gauche de celui de la Maison. Arène à vagues en solo, sans boss : huit nouveaux ennemis (Écuyer, Arbalétrier, Lancier, Chevalier de la Tour, Hallebardier, Cavalier, Paladin doré, Chevalier noir), chacun avec son dessin animé et son projectile. À chaque vague, la vie des chevaliers est multipliée par 1,22 et leurs dégâts par 1,13 ; une nouvelle vague part dès que la précédente est vaincue, ou d'office au bout de 40 secondes. La mort ne coûte rien (ni niveaux, ni objets). Aucune récompense pour l'instant ; le record (vague et temps) est gardé.

## ver.0.0.47 (index.html seulement ; wiki.html régénéré pour le numéro de version)
- Correctif : le titre « Alpha testeur » ne pouvait pas être choisi dans les Options quand le joueur n'avait aucun autre titre (la liste restait grisée).

## ver.0.0.46 (server.js et arbitre.js modifiés ; wiki.html régénéré)
- **Prestige et équipement** : à la mort définitive, chaque objet porté augmente le prestige gagné. Tier 2 : +1 %, Tier 3 : +2 %, Tier 4 : +3 %, Tier 5 : +4 %, Tier 6 : +5 %, Tier 7 : +6 %, Relique : +10 %, et +1 % par niveau de forge. Les pourcentages des quatre objets s'additionnent (quatre Reliques +2 : +48 %). L'écran de mort affiche le bonus.
- **Hôtel des ventes** : la mise en vente coûte 15 % du prix demandé, payés tout de suite et jamais rendus (objet vendu, retiré ou invendu). La taxe de 5 % à la vente reste en place.

## ver.0.0.45 (arbitre.js modifié ; server.js inchangé depuis la 0.0.44 ; wiki.html régénéré)
- **Anti-triche, faux positif corrigé** : une potion de caractéristique donnée par un boss et bue aussitôt (avant la sauvegarde suivante) était jugée « bue sans potion », ce qui refusait la sauvegarde. Elle est maintenant reconnue.
- Les objets **Tier 7** se vendent 15 pièces au marchand (10 avant).
- **Baguette de Miséricorde** : l'attaque n'est plus une vague à viser mais une zone de soin posée sous le curseur (2,4 cases de rayon, 3 % de la vie des alliés dedans, le prêtre compris, deux fois par seconde au plus).
- **Lame de l'Aura** : une onde et des arcs à chaque frappe, un éclat sur chaque monstre touché, et l'aura est maintenant visible par les autres joueurs.

## ver.0.0.44 (server.js et gardien.js modifiés ; wiki.html régénéré)
- **Concours** : plus de portail au Village. À l'heure dite le donjon est annoncé, et il faut trouver son portail dans les Plaines Sauvages. Tous les joueurs présents dans le donjon à la mort du boss gagnent ensemble : la récompense est divisée par leur nombre.
- **Objectif commun** : 5 000 monstres par semaine au lieu de 15 000 (le compteur en cours est conservé), bonus d'expérience de 10 % au lieu de 25 %.
- **Cendreux** : 10 % plus rapide, et il fonce jusqu'à la case du joueur au lieu de rester à 3 cases.

## ver.0.0.43 (server.js, gardien.js et arbitre.js modifiés ; wiki.html régénéré)
- **Stabilité des Plaines et des donjons** : un Gardien en retard de quelques secondes reste l'hôte (plus de monde « refait » par un joueur pendant ce temps : monstres qui disparaissent, portails d'une seconde). Une erreur dans le Gardien ne l'arrête plus. Les monstres sont envoyés jusqu'à 22 cases (15 avant) et ne réapparaissent plus à moins de 24 cases d'un joueur (14 avant) : plus d'apparition à l'écran sur les grands écrans.
- La zone affichée ne passe plus à « Plage des Naufragés » quand on nage dans un lac au milieu de l'île.
- **Monstres agrandis** de 25 % (boss : 10 %), mêmes dessins.
- **Maison** : les meubles se tournent (clic droit ou T, 4 orientations, vues de côté et de dos dessinées) ; **salle en plus** à gauche pour 1 000 pièces (porte dans le mur de gauche, 140 meubles au lieu de 80) ; le catalogue s'ouvre sans à-coup.
- **Visites** : plus de saisie de nom. Bouton « Joueurs » → clic sur un joueur → « Visiter sa maison » ou « Inviter dans ma maison ». Nouvel onglet **Maisons ♥** dans le classement, avec un bouton « Visiter ».
- **Cristal de Cursite** : coûte 1 000 Cursite, rapporte 10 Cursite par jour et par cristal posé. Il peut passer dans le sac (« Mettre dans le sac ») pour être vendu à l'hôtel des ventes ou échangé.
- **Liste des joueurs** : elle quitte le panneau de droite (qui ne bouge plus) pour une fenêtre à part, bouton « Joueurs » ou touche K, les plus proches en premier.
- **Parrainage** : les récompenses de niveau sont retirées. Le parrain gagnera de la Cursite sur les achats de ses filleuls quand la boutique sera en place ; on peut déjà indiquer son parrain.
- **Lame de l'Aura** (artefact, violet, pas encore obtenable en jeu : onglet Objets du panneau admin) : puissance d'une épée Tier 6, ne tire pas ; une aura de 2,5 cases blesse chaque seconde jusqu'à 8 monstres autour du joueur (dégâts de l'arme × vitesse d'attaque).
- Titre **✦ ALPHA TESTEUR ✦** pour les comptes Heartless et Foxy (liste modifiable : variable `ALPHA_COMPTES`).
- Bots : ils parlent cinq fois moins, et n'apparaissent plus dans l'onglet « Joueurs » du panneau admin.
- Nouvelle musique de l'écran titre (boîte à musique en ré mineur, cloche et tic-tac).

## ver.0.0.42 (index.html seulement)
- Correctif : le message « objectif commun » faisait planter le Gardien, qui redémarrait avec un monde neuf (donjon réinitialisé après le boss, monstres et portails qui disparaissent).

## ver.0.0.41 (server.js, butin.js et arbitre.js modifiés ; wiki.html régénéré ; nouvelle image outils/guide/14-maison.jpg)
- **Hôtel des ventes** : un nouveau personnage dans l'échoppe (à gauche du comptoir). Onglet « Vendre » : choisis un objet de ton sac, fixe ton prix, il reste en vente 7 jours (10 ventes à la fois, les potions ne se vendent pas). Onglet « Acheter » : tous les objets des autres joueurs, avec filtre par type et tri par prix ou par tier. Le vendeur touche le prix moins 5 % de taxe, même s'il est déconnecté au moment de la vente (il reçoit ses pièces à son retour). Un objet invendu ou retiré revient dans le sac.
- **Maison à décorer** : 25 meubles à acheter avec des pièces (de la chaise à 8 pièces au Cristal de Cursite à 1 200), à poser où tu veux dans ta maison. Pupitre « Décoration » → onglet « Meubles » → « Poser » : un clic sur une case pose le meuble, un clic sur un meuble le reprend, Échap termine. Un meuble ne peut jamais enfermer une partie de la pièce. 80 meubles au maximum.
- **Visites** : clic sur un joueur → « Visiter sa maison », ou onglet « Visiter » du pupitre (nom de compte, ou liste des maisons les plus aimées). On y voit ses meubles, son style, ses coffres et ses familiers, on croise le propriétaire et les autres visiteurs, et on peut laisser **un cœur** par maison au livre d'or.
- **Parrainage** : nouveau bouton sous la carte. Un nouveau joueur indique le nom de compte de son parrain pendant ses 7 premiers jours. Quand le filleul atteint le niveau 10 puis le niveau 20, parrain et filleul gagnent chacun 25 puis 75 Cursite. 10 filleuls au maximum par parrain.
- **Objectif commun de la semaine** : tous les monstres tués par tous les joueurs du serveur s'additionnent (15 000 par semaine). Une fois l'objectif atteint, tout le monde gagne +25 % d'expérience jusqu'au dimanche soir. La progression s'affiche dans les Évènements.
- **Tournoi de pêche du dimanche** : chaque dimanche (heure de Paris), la plus grosse prise de chaque joueur est classée en direct. Le vainqueur porte le titre « Roi de la pêche » toute la semaine suivante.
- Wiki : nouvelle étape 14 dans « Bien débuter » (maison, hôtel des ventes, parrainage, objectif, tournoi).

## ver.0.0.40 (server.js, gardien.js, butin.js et arbitre.js modifiés ; wiki.html régénéré)
Cette version regroupe les 0.0.37 à 0.0.40.
- **Tous les monstres sont redessinés** en 32 pixels : les 61 qui restaient rejoignent les 22 premiers (slime, gobelins, crabe, squelettes, loups, champignon, feu follet, luciole, noyé, sangsue, ogre, spectres, sylvain, harpie, bandit, salamandre, cendreux, démon, sentinelle, chimère, acolyte, gargouille, ombre, fantôme, chauves-souris, momie, scarabées, djinn, requin, calmar, orbe, griffon, diable cornu, flammèches, yéti, mannequin, hibou, poissons de la Vengeance, pendule, sablier, coucou…). Chacun a deux images de repos et une image d'attaque dessinées à la main.
- Le **Scorpion des sables** est maintenant de profil. Toutes les créatures de profil se retournent pour regarder le joueur.
- **Talismans** : chaque boss de donjon a 20 % de chance de lâcher sa ressource (14 ressources, une par donjon). Elles ne prennent pas de place dans le sac : bouton « Ressources et talismans » sous l'inventaire. Avec 10 ressources d'un même boss, la **table enchantée** au fond de la forge fabrique son talisman. Un seul talisman porté à la fois ; son bonus (vie, mana, armure, vitesse, puissance… selon la difficulté du donjon) profite à tous les héros. Le serveur vérifie les ressources et les talismans.
- **Familiers** : tri par type, rareté ou nombre ; bouton « Choisir » sur chaque familier pour en **relancer 3** contre 1 nouveau familier commun, ou pour les **vendre** (40, 150, 600 ou 2 500 pièces selon le rang).
- **Bots** : ils parlent maintenant des évènements en cours (concours, raid du dragon) et du jeu, quand un vrai joueur est près d'eux.
- **Wiki** : nouvelle rubrique « Bien débuter » (13 étapes avec captures, du premier héros à Chronos) ; au survol d'un monstre, la liste de tout ce qu'il peut donner avec les pourcentages ; nouvelle rubrique « Héros joués » (niveaux cumulés de chaque héros sur tous les comptes, en direct).

## ver.0.0.36 (server.js inchangé depuis la 0.0.35 ; wiki.html régénéré)
- **22 monstres redessinés**, deux fois plus détaillés (32 pixels au lieu de 16) : Mouette vorace, Crapaud géant, Araignée tisseuse, Scorpion des sables, Golem de rouille, Diablotin, Wyrm de lave, Armure hantée, Poisson-lanterne, Ange gardien, Cerbère, Rat géant, Guêpe géante, Golem de pierre, Automate rouillé, Golem de glace, Chevalier comète, Méduse du vide, Rouage vivant, et les boss Roi Bouffon (arlequin couronné, 64 pixels), Carpe koï d'or maudite (une vraie carpe koï) et Dévoreur d'Étoiles.
- **100 attaques dessinées en pixels** à la place des boules : chaque monstre tire un projectile qui lui ressemble (pince du crabe, plume de la mouette, toile de l'araignée, dard du scorpion, boule de feu, carte à jouer du Roi Bouffon, aiguille d'horloge de Chronos…). Les projectiles pointent dans le sens du tir ou tournent sur eux-mêmes selon leur forme. Plusieurs boss alternent deux ou trois attaques. Les zones de dégâts ne changent pas.
- **Tous les monstres sont animés** : deux images au repos (marche, vol, flottement, respiration ou pulsation selon la créature) et une image d'attaque au moment du tir. Seuls le Dragon de guilde et Chronos gardent leur animation propre.
- Wiki : les monstres sont animés comme en jeu, et chaque fiche montre les projectiles du monstre.

## ver.0.0.35 (server.js modifié ; wiki.html régénéré)
- Wiki : les monstres n'apparaissent plus en double dans les donjons. Nouvelle rubrique **Classement**, avec les mêmes catégories qu'en jeu, lue en direct sur le serveur.
- Classement : nouvelle catégorie **Top Précision** (en jeu et sur le wiki), 300 tirs minimum pour être classé.
- Raccourcis : **B** ouvre le wiki, **N** les succès, **M** la grande carte (modifiables dans les Options).
- Nouveau bouton **Carte** : la mini-carte s'affiche en grand au milieu de l'écran, sans mettre le jeu en pause.
- Écran titre : des éclairs frappent l'horloge, et la grande aiguille se détraque régulièrement (elle tremble, saute, laisse une image fantôme).
- Démoniste, parchemins de pacte : 1 démon aux T0 et T1, 2 du T2 au T4, 3 aux T5 et T6, 4 au Tier 7 d'obsidienne. Coût en mana +50 %. La forge compte maintenant : +10 % de dégâts et de durée des démons par niveau, et +20 mana max par niveau.
- Plaines Sauvages : 15 % de monstres en plus.

## ver.0.0.34 (server.js et gardien.js modifiés ; nouveau fichier public/wiki.html)
- **Écran titre** au lancement : l'Horloge Brisée, violette, tourne à l'envers au milieu d'un tourbillon d'étoiles, d'engrenages et de ruines. Menu « Jouer », « Options », « Wiki du jeu » ; touche Entrée pour jouer. L'écran a sa propre musique (lente, en mineur, avec le tic-tac de l'horloge), qui démarre au premier clic.
- **Wiki** : nouvelle page `/wiki` (bouton sur l'écran titre et dans le panneau de droite). Objets avec leurs caractéristiques au survol, monstres et boss avec vie, dégâts, expérience et butin, zones, donjons et comment y entrer, taux de butin, héros, poissons. La page est fabriquée à partir du jeu lui-même par `outils/generer-wiki.js` : les chiffres sont ceux du serveur.
- **Bots** : 4 faux joueurs (nom, héros, niveau et équipement tirés au hasard) se promènent au Village, partent se battre dans les Plaines Sauvages dans une zone de leur niveau, reviennent, et saluent les vrais joueurs qu'ils croisent (« salut », « coucou », « bonjour »…). Ils n'ont pas de compte : ni butin, ni expérience, ni classement. Réglage : variable `BOTS` du serveur (0 pour les couper, 12 au maximum, 4 par défaut).

## ver.0.0.33 (butin.js et arbitre.js modifiés, server.js inchangé depuis la 0.0.32)
- Plaines Sauvages, rivage : les cases au bord de l'eau sont animées, la vague monte et redescend sur le sable avec sa frange d'écume, et des crêtes blanches avancent vers la terre (mer et lacs).
- Transitions entre zones : les couleurs de deux zones voisines se mélangent sur le bord au lieu d'une coupure nette.
- Rochers : 3 nouvelles formes (dalle plate, aiguille, amas de pierres), présentes sur la Plage, dans le Canyon de Rouille et dans les Terres Brûlées.
- Arbres : 3 nouveaux arbres dans les Plaines d'Émeraude (sapin, pommier, bouleau) et 3 dans la Forêt des Murmures (sapin sombre, arbre aux lucioles, cyprès violet) ; 3 nouveaux arbres morts dans le Marais Putride (souche, arbre penché, grand tronc fendu).
- Chemins rapides : pavage de briques, dessiné deux fois plus finement.
- Baguette de Miséricorde (Prêtre) : la vague de soin est presque deux fois plus large, porte un peu plus loin et soigne 3 % de la vie au lieu de 2 %.
- Sort de l'Éclipse (Mage, celui qui se lance 3 fois) : dégâts −40 %.
- Bâton de la Nova (Mage) : dégâts +30 %.
- Œufs de familier : 1 chance sur 200 sur tous les monstres (au lieu de 1 sur 1000).

## ver.0.0.32 (server.js modifié ; mentions.html modifié)
- Le jeu s'appelle désormais **The Curse** partout : fenêtre de connexion, message de bienvenue, page des conditions d'utilisation.
- Village, hall : l'autel des classes, le pupitre du pseudo et la statue des skins sont contre le mur de gauche, de part et d'autre de l'entrée de la forge. « Forge » et « Échoppe » sont écrits sur des panneaux de bois plantés devant les portes.
- Passeur des mondes retiré : on change de serveur à la **fontaine** (touche E à côté du bassin).
- Deux nouvelles portes autour des portails, dessinées deux fois plus finement : une ruine maudite (crâne cornu, runes, ronces, flammes violettes) pour les Plaines Sauvages, un porche à colombages (toit de tuiles, lanternes, lierre, jardinières) pour la Maison.
- Forge : hotte, soufflet, tas de charbon, armes au mur, bac de trempe fumant, tonneaux, lingots, meule qui tourne, étincelles sur l'enclume. La forge apparaît sur la mini-carte.
- Passage secret : derrière le mur de la forge (coin en bas à gauche), un couloir noir invisible mène à la salle de test.
- Prés du sud entièrement refaits et agrandis : clôtures en bois à la place des murs, chemins de terre, arbres et rochers, étang déplacé, maison du pêcheur avec son ponton, pré des vaches et poulailler en bas à droite (animaux animés). L'Éleveur est maintenant à côté des enclos.
- Pêcheur : assis au bout du ponton, il donne la quête « attraper tous les poissons » (lac et mer), récompensée par le titre exclusif 🎣 PÊCHEUR MAUDIT 🎣 ; la progression s'affiche au-dessus de lui et dans le tableau de pêche.
- **Table à dessin** (à la place de la statue en bas à gauche du hall) : une toile commune de 100 × 100 pour tout le serveur. Chaque joueur pose un pixel par minute, 24 couleurs, molette pour zoomer, glisser pour se déplacer. La toile se voit en direct sur le chevalet. Les admins n'ont pas de délai et peuvent tout effacer. La toile est gardée par le serveur (`dessin.json` dans le dossier de données).

## ver.0.0.31 (butin.js modifié, server.js inchangé)
- Correction : un monstre « presque mort » ne disparaît plus pour revenir avec quelques PV, et un boss ne remonte plus à 50 %. Un gros coup dépassant le plafond de l'anti-triche du Gardien était perdu pour de bon ; il est maintenant appliqué en plusieurs fois.
- Boss du centre des Plaines (Roi Bouffon, Béhémoth d'Obsidienne) : leur barre de vie et leur nom s'affichent de nouveau, en plus gros. La flèche de boss pointe vers le plus proche des deux.
- Seigneur des Braises (Fournaise Infernale) : à 50 % de vie il devient invulnérable 5 s, puis des rochers tombent du plafond jusqu'à la fin du combat.
- Reine des Glaces : la salve rapide tirée droit sur le joueur est retirée, et l'anneau de projectiles n'a plus de trou.
- Sanctuaire des Lucioles : dégâts des monstres −20 %. Abysses Engloutis : le Léviathan attaque 30 % plus lentement.
- Autel des Lucioles : le bonus dure 30 s et une icône d'état l'indique.
- Pièces gagnées sur les monstres : +30 %. Créer une guilde coûte 100 pièces.
- Duels : l'option est retirée du menu des joueurs et les pièces de sang ne sont plus affichées (le code reste en place).
- Affichage : le nom en haut à gauche et le titre de l'onglet deviennent « The Curse » ; la ligne des états du héros a une hauteur réservée (la barre ne saute plus) ; l'inspection d'un joueur affiche « UT » pour une relique au lieu de « T7 ».
- Village : l'autel des classes, le pupitre du pseudo et la statue des skins s'utilisent aussi depuis les côtés.
- Portail de l'Horloge Brisée : deux aiguilles tournent sur le portail.
- Salle d'essai (admin) : salle élargie, Château de Morvane placé après la Caverne de Glace, et paliers de difficulté affichés au mur.
- Panneau admin, onglet Objets : la liste se construit par petits morceaux, le jeu et la musique ne se figent plus à l'ouverture.

## ver.0.0.30 (arbitre.js modifié, server.js inchangé)
- Bonus de connexion revu : jour 3 anneau Tier 6, jour 4 100 Cursite (inversés) ; jour 6 une Relique au hasard, tirée parmi toutes les reliques classiques et les Reliques de Chronos, toutes classes confondues ; jour 7 le titre « ★ BETA TESTEUR ★ » (75 Cursite si on l'a déjà). Le set Relique complet du jour 7 disparaît.

## ver.0.0.29 (server.js inchangé depuis la 0.0.28)
- Tombes : quand un joueur meurt, une pierre tombale à son nom apparaît à l'endroit de sa mort pour les autres joueurs présents (Plaines, donjons, raid). Elle reste 2 minutes.

## ver.0.0.28 (server.js, butin.js et arbitre.js modifiés)
- Héros à débloquer : Guerrier, Mage, Archer et Prêtre sont disponibles dès le départ. Guerrier niveau 15 débloque le Porte-bouclier, Mage niveau 15 le Mystificateur, Archer niveau 15 l'Assassin, Prêtre niveau 15 le Démoniste. L'écran de choix est réorganisé : chaque héros à débloquer est sous son « parent », avec la progression affichée. Un héros déjà créé reste jouable, et un déblocage est acquis pour toujours. Le serveur vérifie.
- Message de bienvenue : quand un nouveau compte choisit son premier héros, tout le monde voit « Bienvenue à … » dans le chat, et le nouveau joueur reçoit une bannière.
- Conditions d'utilisation : nouvelle page `/mentions` (conditions d'utilisation, confidentialité, mentions légales). Chaque joueur, nouveau ou déjà inscrit, doit les accepter une fois avant de jouer ; le serveur garde la date d'acceptation. Si le texte change, le jeu redemande l'accord. Nouveau fichier `public/mentions.html`.
- 14e Relique de Chronos : la **Gemme du Démon Lié** (Démoniste). Le démon n'est plus posé au sol : il suit son maître et attaque seul ce qui approche, pour 75 % des dégâts.
- Pièces : quand on gagne de l'or (monstre, vente au marchand, récompense de quête), les pièces jaillissent, restent un instant au sol puis filent vers le héros, qui les attrape, même s'il bouge. Animation seulement : l'or est compté comme avant.
- Nouveau **Tier 7** (objets d'obsidienne, gris-noir) : armes, capacités, armures et anneaux. Mêmes effets que le Tier 6, avec plus de dégâts et de caractéristiques ; ce ne sont pas des reliques. Ils ne tombent que dans les deux derniers donjons (Observatoire Céleste et Horloge Brisée) : 5 % de chance par monstre tué.
- Couleurs fixes : les reliques sont turquoise, les Reliques de Chronos sont or, le Tier 7 est gris-noir. L'icône ne change plus de couleur en permanence ; seul le petit symbole dans le coin de la case scintille encore.
- Panneau admin, onglet Objets : chaque type d'objet tient sur une seule ligne (T0 à T6, puis Tier 7, Relique, Reliques de Chronos), avec un cadre de la couleur de la famille.

## ver.0.0.27 (butin.js et arbitre.js modifiés, server.js inchangé)
- Touches **1, 2, 3, 4** : elles agissent sur les 4 premières cases du sac (un petit numéro s'affiche sur chaque case). Une potion de vie ou de mana est bue, une potion de caractéristique aussi (sauf si le maximum est atteint), et un équipement est échangé avec celui qu'on porte. Touches modifiables dans les Options.
- 13 **Reliques de Chronos** (couleur ambre, symbole ⌛) : Chronos en donne une à chaque victoire, à 100 %, avec une chance sur deux qu'elle soit pour la classe du joueur. Elles ont les mêmes bonus que les reliques classiques mais un effet différent.
  - Voile de Pureté (Assassin) : retire tous les effets négatifs et en protège 2 s.
  - Miroir de Frénésie (Mystificateur) : après la téléportation, +100 % de vitesse d'attaque pendant 1 s (recharge 2,5 s).
  - Grimoire du Renouveau (Prêtre) : soin de 160 PV dans 6 cases, puis régénération de 3 % de la vie par seconde pendant 6 s pour tous les joueurs touchés.
  - Carquois de la Vipère (Archer) : grande flèche qui se scinde 4 fois en 2 flèches à 30 % des dégâts ; tout ce qui est touché est empoisonné 4 s.
  - Sort de Gravité (Mage) : zone de 6 cases qui attire et regroupe tous les monstres (pas les boss).
  - Heaume du Ralliement (Guerrier) : +60 % de vitesse de déplacement pendant 2 s pour le groupe dans 5 cases.
  - Pacte de Chair (Démoniste) : démon soigneur (14 s) qui rend 5 % de la vie toutes les 2 s dans 4 cases ; il s'ajoute aux autres démons ; 150 mana.
  - Rempart des Braves (Porte-bouclier) : +24 armure (l'équivalent du bouclier T4) pendant 6 s pour tous les joueurs dans 5 cases.
  - Bâton de la Nova (Mage) : 12 projectiles tout autour de soi, portée divisée par deux.
  - Lame du Colosse (Guerrier, Porte-bouclier) : vitesse d'attaque à 33 %, dégâts à 400 %, portée réduite de 20 %.
  - Arc de la Tempête (Archer) : 5 flèches, vitesse d'attaque doublée, dégâts d'un arc Tier 2.
  - Baguette de Miséricorde (Prêtre) : aucun dégât ; chaque tir est une vague qui rend 2 % de leur vie aux alliés traversés (au plus une fois toutes les 0,35 s par prêtre). Elle ne soigne ni le prêtre ni les monstres.
  - Crocs Jumeaux (Mystificateur, Assassin) : 3 lames, vitesse d'attaque doublée, dégâts très réduits.
- Nouvel état « Régénération » ; le poison des flèches s'affiche en dégâts verts.
- Panneau admin, onglet Objets : la fiche complète d'un objet s'affiche au survol de la souris, et les Reliques de Chronos ont leurs deux lignes.

## ver.0.0.26 (server.js inchangé)
- Parchemin ensanglanté : 3 démons à la fois au T5 (1 au T0, 2 du T1 au T4, 3 au T5, 4 au T6).
- Les deux boss du centre des Plaines (le Roi Bouffon et le Béhémoth d'Obsidienne) peuvent être présents en même temps : tous les 20 monstres tués, celui qui manque apparaît, sans attendre la mort de l'autre.
- Deux nouveaux skins (500 Cursite, à la Statue des skins) : **Chevalier noir** pour le Porte-bouclier (armure noire, lueur rouge dans la visière, et **Démon d'azur** pour l'Invocateur (peau bleue, peau bleue).
- Particules : elles ne sont plus incluses dans les skins. Elles s'achètent à part à la Statue des skins, 300 Cursite par classe, et se portent avec n'importe quelle apparence de la classe (bouton Montrer / Cacher).
- L'Invocateur s'appelle maintenant le **Démoniste**. Ses démons prennent la couleur de son skin (bleus avec le Démon d'azur).

## ver.0.0.25 (server.js inchangé)
- Invocateur :
  - Compteur sous le héros : « Démons 2/4 » (1 au T0, 2 du T1 au T5, 4 au T6), ou « Gardien 0/1 » avec la relique.
  - Les démons attaquent 0,35 s après leur apparition (au lieu de 1 s), et déplacer le démon de la gemme ne remet plus son attaque à zéro.
  - Coût du Parchemin ensanglanté : 10 mana au T0, +5 par tier, soit 40 au T6 (au lieu de 25) et 45 pour la relique. Les parchemins déjà obtenus sont mis à jour.
  - La relique n'invoque plus que le démon gardien (le tank) : plus de petit démon qui attaque en même temps.
  - Correction : un monstre tué par un démon pouvait réapparaître. Un démon resté loin derrière le héros frappait des monstres que le serveur jugeait trop éloignés du joueur : le coup était refusé et le monstre revenait. Un démon disparaît maintenant à plus de 13 cases du héros et ne vise que des monstres à moins de 15 cases de lui.
- Porte-bouclier : grand écu bleu à emblème doré, porté devant lui.

## ver.0.0.24 (server.js et arbitre.js modifiés)
- Invocateur revu : c'est maintenant un **démon** (cornes, peau rouge) qui invoque des démons de la famille de la Fournaise Infernale. La couleur de leurs yeux suit le tier de l'arme. La relique invoque un démon gardien.
  - Son arme devient la **Gemme de sang** et sa capacité le **Parchemin ensanglanté** (nouvelles icônes, nouveaux noms, projectiles rouge sang). Les objets déjà obtenus sont renommés tout seuls.
- Porte-bouclier revu : un vrai chevalier, heaume d'acier fermé avec visière en T, armure sombre et écu au bras.
- Forge : un anneau s'améliore maintenant avec 2 anneaux **du même tier** (leurs bonus sont tirés au hasard, deux anneaux n'étaient presque jamais « identiques »). Vaut aussi pour les anneaux Relique.
- Concours : la bannière est visible dès maintenant dans les Événements, avec la date et le compte à rebours, **sans dire quel donjon**. Le serveur ne révèle le donjon aux joueurs qu'au départ du chronomètre.
- Salle des portails admin : ajout de La Vengeance sous-marine et de l'Horloge Brisée (14 portails). Les admins peuvent y tuer des monstres sans clef ni ticket.

## ver.0.0.23 (server.js, arbitre.js et butin.js modifiés)
- Deux nouvelles classes (8 au total) :
  - **Porte-bouclier** : épée et armure lourde comme le Guerrier, mais la plus grosse armure du jeu. Capacité « bouclier » : En garde (armure fortement augmentée pendant 4 à 7,5 s) et une vague qui traverse les ennemis et **brise leur armure**. Relique (Égide du Titan) : invulnérable 1 seconde.
  - **Invocateur** : nouvelle arme, la **mandoline** (8 tiers, relique comprise). Elle ne frappe pas : elle pose un esprit immobile, intouchable (les tirs le traversent), qui attaque à sa place 1 seconde après son apparition. Une nouvelle invocation remplace l'ancienne. Les dégâts montent avec le tier de la mandoline et la puissance du héros. Capacité « totem » : esprits supplémentaires (1 à la fois au T0, 2 du T1 au T5, 4 à partir du T6 avec une recharge très courte). Relique (Totem des Anciens) : pose en plus un golem-rempart immobile qui arrête 15 tirs ennemis puis disparaît.
- Armure des monstres : tous les monstres ont maintenant 10 % d'armure (15 % pour les boss). Leur vie a été baissée d'autant, donc rien ne change pour les classes existantes. Nouvel état « Armure brisée » (icône de bouclier fendu) : tant qu'il dure, tout le groupe inflige 10 à 15 % de dégâts en plus. Nouvel état « En garde » pour le Porte-bouclier.
- Forge du Village : nouvelle aile à gauche du hall (porte en face de celle de l'échoppe). Le forgeron fond **2 objets identiques** dans l'objet équipé : +10 % d'efficacité par niveau, 2 niveaux au maximum (+1, +2). Dégâts, armure, bonus de caractéristiques et puissance de la capacité augmentent ; le nombre de projectiles ne change jamais. Le niveau suit l'objet dans les échanges. Le serveur vérifie chaque forge.
- Nouveau donjon rare : **La Vengeance sous-marine**. En pêchant dans les Plaines Sauvages, 1 prise sur 250 ouvre un portail de 60 s que tout le monde peut prendre. Donjon intermédiaire (niveau de la Forge Rouillée), entièrement sous l'eau, avec des courants marins. 5 poissons-monstres (Sardine vengeresse, Rouget enragé, Raie des profondeurs, Congre furieux, Espadon rancunier) et, dans l'arène, les deux poissons légendaires ensemble : le Poisson-lune doré des abysses et la Carpe koï d'or maudite. La sortie s'ouvre quand les deux sont vaincus.
- Concours du premier donjon (samedi 3 octobre 2026, 18 h) : le premier joueur qui termine le donjon désigné, commencé après le départ, gagne 500 Cursite. À 18 h : fenêtre d'explication (aussi à la connexion) et portail du concours dans le Village. Le gagnant et son temps sont annoncés à tout le monde. Les comptes admin ne concourent pas.
- Familiers animés : ils se tournent comme le héros, bougent la tête, et marchent selon l'animal (6 pattes pour la fourmi, 4 pour le lion, bonds du lièvre, battements d'ailes du colibri…).
- Le succès « Toutes les classes niveau 20 » compte les 8 classes.
- Bouton Quêtes : raccourci clavier **J** (modifiable dans les touches).
- Panneau admin : les Gardiens n'apparaissent plus dans la liste des joueurs. Nouveaux boutons : état / lancement / remise à zéro du concours, et portail de test vers La Vengeance sous-marine.
- La salle de test des admins a été déplacée beaucoup plus loin : on ne peut plus l'apercevoir depuis le Village.
- L'écran de choix du héros passe à 4 colonnes.

## ver.0.0.22 (server.js et arbitre.js modifiés)
- Correction du message « Sauvegarde resynchronisée » qui touchait des joueurs honnêtes : un objet posé au sol puis repris était vu par le serveur comme un objet apparu de nulle part. Le serveur se souvient maintenant pendant 2 min 30 de ce qui a été posé.
- Même correction pour un cadeau resté au sol parce que le sac était plein (récompense de connexion, cadeau d'un admin, récompense de raid) et ramassé plus tard.

## ver.0.0.21 (server.js, butin.js et arbitre.js modifiés)
- Nouveau donjon de fin de jeu : l'Horloge Brisée, accessible seulement avec une Clef du Temps.
  - La clef est un objet du sac. Elle tombe à 1 % sur le boss des 6 grands donjons (Château de Morvane, Nécropole des Dunes, Abysses Engloutis, Jardins Célestes, Fournaise Infernale, Caverne Gelée) et à 10 % sur chacun des 4 gardiens de l'Observatoire Céleste (pas sur le Dévoreur d'Étoiles).
  - Utilisée depuis le sac, elle ouvre n'importe où (Village, Plaines, maison, hall de guilde) un portail de 60 secondes que les autres joueurs peuvent prendre.
  - Le temps y est déréglé : dans les zones bleues il ralentit, dans les zones dorées il accélère, pour le joueur comme pour les projectiles ennemis.
  - 4 nouveaux monstres : Rouage vivant, Pendule possédée, Sablier errant (ses tirs ralentissent), Coucou mécanique.
  - Boss : Chronos, l'Horloger Maudit (230 000 PV), dessiné en grand format avec les aiguilles de son cadran et son balancier animés en continu. Ses sorts s'enchaînent au hasard, jamais deux fois le même de suite : Carillon (projectiles qui partent puis reviennent), Tic tac (salves visées), Pluie d'engrenages, Les Aiguilles (deux aiguilles géantes balaient l'arène), Arrêt du temps (il faut se réfugier dans une bulle, sinon on est paralysé), Rembobinage (on est ramené là où on était 3 secondes plus tôt). Trois phases : sous 33 % de vie, les aiguilles ne s'arrêtent plus.
  - Butin : 5 objets Tier 6, 1 chance sur 5 de Relique, 3 à 4 potions de caractéristique, 10 000 XP. Nouveau succès et titre « Maître du Temps ».
  - Anti-triche : la clef ne peut venir que du serveur, le serveur vérifie qu'elle est bien consommée, et un donjon à clef ouvert sans clef ne rapporte rien.
- Volet Événements : 4 nouvelles bannières cliquables (Horloge Brisée, Bonus de connexion, Quêtes de la semaine, Poissons légendaires). La pastille indique ce qui est à récupérer.
- Le titre ADMIN est disponible en permanence pour les comptes admin, sans passer par /god.
- En sortant d'un donjon ouvert depuis le Village, on revient au Village.

## ver.0.0.20 (server.js modifié)
- Nouveau volet « Événements » dans le panneau de droite, juste au-dessus des Commandes : bannière du Raid du Dragon (jeudi 8 octobre 2026, compétition de guildes) avec le nombre de jours restants. Un clic sur la bannière ouvre la fenêtre de guilde.
- Guildes limitées à 3 membres. Les guildes qui en ont déjà plus gardent leurs membres mais ne peuvent plus recruter.
- Correction : le panneau de pêche du Village affichait encore « /20 » au lieu de 22 poissons.

## ver.0.0.19 (server.js modifié + nouveau fichier deploy/annoncer.js, deploy/mettre-a-jour.sh modifié)
- Annonce de mise à jour : avant chaque mise en ligne, un grand bandeau en haut de l'écran affiche un compte à rebours de 30 secondes (rouge sur les 10 dernières). La progression est sauvegardée juste avant la coupure, puis la page se recharge toute seule sur la nouvelle version dès que le serveur est revenu.

## ver.0.0.18 (server.js inchangé, arbitre.js modifié)
- Dash retravaillé : un vrai bond quasi instantané de 1,5 case (au lieu d'une courte accélération), avec une traînée d'images du héros, et que les ralentissements n'affectent plus.
- Quêtes de la semaine : 3 objectifs longs, les mêmes pour tout le monde, du lundi au dimanche (tuer 600 à 1 000 monstres, vaincre 20 à 30 boss, terminer 10 à 15 donjons, pêcher 25 à 40 poissons ou parcourir 60 000 à 100 000 cases). Récompenses en pièces, et +150 Cursite quand les 3 sont terminées. Elles sont dans la fenêtre des quêtes, sous les quêtes du jour.
- Succès : nouveau bouton sous Classement et Quêtes. Chaque succès débloque un titre :
  - Pêcheur maudit : pêcher au moins une fois chaque poisson des deux mondes ;
  - Tueur d'étoiles : vaincre 10 fois le Dévoreur d'Étoiles (Observatoire Céleste) ;
  - Maître des héros : tous les héros au niveau 20 en même temps ;
  - Fléau des monstres : tuer 10 000 monstres.
- Pêche : les poissons verts deviennent « Peu commun », les bleus « Rare », les violets « Épique ». Nouveau rang Légendaire, en jaune, avec un poisson par monde : la Carpe koï d'or maudite (lac) et le Poisson-lune doré des abysses (mer). Ils sont très rares et demandent deux touches réussies d'affilée dans une zone plus petite.
- Échoppe : l'offre du jour (skin à −50 %) apparaît aussi dans l'onglet Cursite.
- Le bouton doré de l'admin s'appelle maintenant CURSITE, avec le logo de la Cursite.
- Monnaies sous la carte : une ligne par monnaie, avec le nombre aligné à droite.

## ver.0.0.17 (server.js, gardien.js, butin.js et arbitre.js modifiés)
- Dash pour toutes les classes : Maj gauche (modifiable dans Options → Touches, clic du stick gauche à la manette). Bond d'environ 1,5 case dans la direction où l'on marche (ou vers la souris), recharge de 3 s affichée sous la barre de vie.
- Compteur de DPS au hall de guilde : un mannequin d'entraînement (à droite du hall) et un panneau qui apparaît dès qu'on le frappe. Il affiche les DPS des 3 dernières secondes, les DPS moyens, les dégâts et la durée de la session (une session se termine après 4 s sans frapper), la session précédente et le total depuis l'arrivée au hall. Bouton « Remettre à zéro ».
- Échoppe du Village : nouvel onglet Cursite, avec l'œuf de familier à 50 Cursite et un boost d'expérience à 100 Cursite (+30 % d'XP pour tous les héros du compte pendant 1 h, temps restant affiché en haut de l'écran).
- Passeur des mondes, nouveau PNJ du Village (à droite de la fontaine) : choix entre 3 serveurs, Roi Bouffon, Léviathan et Dévoreur d'Étoiles, avec le nombre de joueurs en ligne sur chacun. Tout le monde arrive sur Roi Bouffon au lancement. Chaque serveur a ses propres Plaines gardées par le serveur, et la progression suit le compte partout.
- Admin : nouvel onglet « Suspects », mis à jour toutes les 5 s. Il note chaque compte selon ses sauvegardes refusées, ses monstres refusés, ses dégâts au-delà de son équipement, ses coups de trop loin, ses longues séries près d'un boss sans perdre de vie et ses déplacements impossibles. Un compte qui passe au rouge est aussi noté dans l'onglet Triche.

## ver.0.0.16 (server.js et gardien.js modifiés)
- Anti-triche, étape 4 : chaque donjon occupé a maintenant son propre Gardien, une copie invisible du jeu lancée par le serveur, qui en est l'hôte.
  - C'est lui qui décide de la mort des monstres et des boss. Même seul dans un donjon, un joueur ne peut plus inventer de monstres.
  - Les dégâts sont plafonnés selon l'équipement, comme dans les Plaines.
  - Le Gardien d'un donjon s'en va 45 secondes après le départ du dernier joueur.
- Raid du Dragon : les dégâts comptés pour chaque joueur sont plafonnés selon son équipement (un tricheur ne peut plus faire gagner sa guilde).
- Potions de caractéristique dans les Plaines : 0,8 % par monstre dans les Terres Brûlées, 1,1 % dans les Terres Désolées.

## ver.0.0.15 (server.js modifié + nouveau fichier gardien.js, butin.js et arbitre.js modifiés)
- Anti-triche, étape 3 : le Gardien des Plaines. Le serveur fait tourner en permanence une copie invisible du jeu, qui est l'hôte des Plaines Sauvages.
  - Le monde ne se réinitialise plus quand on sort d'un donjon : monstres, boss et portails continuent de vivre même quand personne n'est là.
  - Dans les Plaines, seul le Gardien décide de la mort d'un monstre. Un joueur ne peut plus inventer de monstres, même seul.
  - Les dégâts de chaque joueur sont plafonnés selon son équipement, et ne comptent que sur les monstres proches de lui.
- Admin invisible : sa bulle de message s'affiche maintenant au-dessus de lui (le chat les montrait déjà), et il disparaît bien de la liste des joueurs.
- Potions de caractéristique : 3 % de chance par monstre dans les deux dernières zones des Plaines (Terres Brûlées et Terres Désolées), au lieu de 0,1 % et 0,5 %.
- Potions de vie et de mana à 5 pièces au lieu de 10 chez le marchand.

## ver.0.0.14 (server.js modifié + nouveau fichier butin.js, arbitre.js modifié)
- Anti-triche, étape 2 : le butin, l'XP et les pièces des monstres sont maintenant tirés par le serveur. Le jeu signale chaque monstre tué et le serveur vérifie que c'est plausible : bonne zone, monstre près du joueur, compté une seule fois, rythme humain. À plusieurs, la mort doit avoir été annoncée par l'hôte.
- Le serveur refuse tout équipement qu'il n'a pas donné lui-même (butin, récompense du jour, échange, cadeau admin, équipement de départ), ainsi que toute XP ou tout monstre tué qu'il n'a pas comptés.
- Échanges protégés contre la duplication : celui qui donne un objet doit bien le perdre, sinon l'objet est retiré de sa sauvegarde.
- La limite de niveaux gagnés par minute disparaît : l'XP est maintenant vérifiée exactement.
- Onglet admin « Triche » : signale aussi les joueurs dont beaucoup de monstres réclamés sont refusés.
- Correction : dès le deuxième donjon d'une session, une partie des monstres ne donnait ni XP ni butin.
- Correction : à la première connexion sur un nouveau navigateur, une sauvegarde vide pouvait être envoyée au serveur juste avant le rechargement de la page.

## ver.0.0.13 (server.js modifié + nouveau fichier arbitre.js)
- Anti-triche, étape 1 : le serveur vérifie chaque sauvegarde avant de l'enregistrer (or, Cursite, objets, niveaux, potions, familiers, prestige, coffre et sacs). Une sauvegarde impossible est refusée et le joueur revient automatiquement à sa dernière sauvegarde valide.
- Objets trafiqués (stats impossibles) supprimés, gains d'or ou de Cursite irréalistes annulés.
- Récompenses données par le serveur (commandes admin, raid, récompense quotidienne) toujours acceptées.
- Menu admin : nouvel onglet « Triche » qui liste les sauvegardes refusées (compte, raison, heure).
- Le pseudo suit maintenant le compte d'un PC à l'autre.
- Icône couronne dans l'onglet du navigateur.
- Bouton Quêtes à côté du classement des joueurs.

## ver.0.0.12 (server.js modifié)
- Comptes joueurs : connexion au lancement, progression sauvegardée sur le serveur (on la retrouve sur n'importe quel PC), un seul appareil connecté par compte. La sauvegarde locale actuelle est reprise à la première connexion.
- Admin lié au compte (variable ADMIN_COMPTES côté serveur) : /god sans mot de passe pour les admins, refusé pour les autres.
- Nouveaux noms : le Nexus devient le Village, le Royaume devient les Plaines Sauvages, le Dieu Fou devient le Roi Bouffon (et ses Terres Désolées), le Colosse devient le Béhémoth d'Obsidienne, le Manoir Hanté devient le Château de Morvane, le Tombeau des Sables devient la Nécropole des Dunes, le Seigneur des Abysses devient le Seigneur des Braises, le Trickster devient le Mystificateur, les tomes deviennent des grimoires, les prismes des miroirs, Berserk devient Rage et Sonic devient Véloce.
- Support manette : stick gauche pour bouger, stick droit pour viser et tirer, A interagir, X capacité, Y et LB potions, B ramasser ou fermer, Start options.
- Bouton Boutique doré (aperçu admin, au Village).
- Lanceur Windows (.exe) qui charge le jeu depuis le serveur : les mises à jour arrivent sans réinstaller.

## ver.0.0.11 (server.js modifié)
- Nouveau système d'états, avec une icône au-dessus des joueurs et des monstres, et dans le HUD au-dessus de ta barre de vie :
  - paralysé (ne bouge plus) ;
  - empoisonné (dégâts par seconde, les poisons s'additionnent) ;
  - ralenti (sables, ronces, nage, contre-courant…) ;
  - aveuglé (écran noir sauf un petit cercle autour de toi) ;
  - enflammé (lave, attaques de feu) ;
  - enragé (Berserk du guerrier) ;
  - invulnérable ;
  - sonic (chemins, courants dans le bon sens).
- Archer : sa flèche spéciale paralyse les monstres (pas les boss), plus longtemps avec un meilleur carquois. Portée de l'arc ramenée à 10 cases.
- Manoir Hanté : les chauves-souris et les orbes roses du Comte aveuglent.
- Fournaise : les diables cornus, les cerbères et les boules de feu du Seigneur des Abysses enflamment, comme les flammes du Dragon de raid.
- Marais Putride (crapauds, sangsues) et Gardien du Serpent : poison.
- Abysses : la noyade est progressive (1 %, 2 %, 3 %, 5 %, 8 %… de vie par seconde), et une poche d'air apparaît à la mort du Léviathan.
- Jardins Célestes : courants moins forts (-80 % à contre-courant, +90 % dans le sens, ils t'emportent quand même). Les tourbillons violets de la salle du boss deviennent des tremplins qui te propulsent pour esquiver. Éclairs de l'Archange -20 %.
- Les boss des 7 donjons de fin (Manoir, Tombeau, Abysses, Jardins, Fournaise, Caverne, Observatoire) donnent une potion de caractéristique à coup sûr.
- Retour au Royaume après un donjon : 5 s d'invulnérabilité, annulées par ton premier tir.
- Les monstres esquivent 2 fois moins, contournent les murs quand ils ne peuvent pas te toucher, et peuvent maintenant nager.
- Le compteur du prochain boss central n'est plus visible que par les admins.
- Flèche vers le maître des quêtes quand une quête est à récupérer.
- Titre « ADMIN » (réservé aux admins vérifiés par le serveur).
- Maison : 2 nouvelles décorations, le Château des Ombres (très sombre) et le Paradis (tout blanc), à la place de la cabane sylvestre et du sanctuaire astral.
- Marchand réorganisé en 3 rayons (Potions, Familiers, Sacs à dos), cartes plus petites. Nouveaux articles : œuf de familier (300 pièces) et potion de caractéristique du jour (50 pièces, 1 par jour).
- Étang du Nexus au sud du hall : ponton, nénuphars, roseaux et cabane du pêcheur. On y pêche ensemble et on voit la ligne des autres.
- Menu des joueurs : nouvelle option « Inspecter » (équipement, statistiques, monstres tués, prestige, familier…).

## ver.0.0.10 (server.js modifié)
- Familiers entièrement redessinés, avec 2 fois plus de pixels. Chaque rang change vraiment leur look (écharpe, capuche de mage, carapace de lave, crinière de feu, ailes…).
- Tous les boss de donjon redessinés avec 2 fois plus de pixels, y compris les 4 gardiens de l'Observatoire. Chacun a une pose d'attaque et ses propres projectiles : os, chauves-souris, scarabées, bulles, plumes, crânes enflammés, éclats de glace, étoiles, épines, lucioles, rochers, engrenages… Les attaques restent les mêmes.
- On arrive dans le Royaume sur la plage, au bord de la mer.
- Le bord de mer (6 cases) et tous les lacs se traversent à la nage : vitesse réduite, le héros a de l'eau jusqu'à la taille. Les monstres n'y entrent pas.
- Gardien du Prestige dans la maison : il débloque les niveaux 21 à 25 pour tous tes héros (1000 / 2500 / 3500 / 5000 / 6000 prestige). Chaque niveau donne ses statistiques en plus des plafonds.
- La musique de boss continue pendant tout le combat, même si on s'éloigne un moment.
- Assassin : barre bleue sous la vie pour le temps d'invisibilité restant, et les monstres ne semblent plus regagner de vie pendant l'invisibilité.
- Connexion quotidienne : jour 3 = 100 Cursite, jour 5 = 150 Cursite (250 au total, de quoi prendre un skin en promo).
- Historique du chat : Entrée affiche les derniers messages.
- Options : le choix du curseur ne montre plus que le style (la couleur se choisit en dessous).
- Nexus : les statues ne font plus ramer le jeu sur Edge.
- Admin : commande /god, don de pièces aux joueurs, onglet « Admins » qui liste qui a le mode admin en ce moment.

## ver.0.0.9 (server.js modifié)
- Raid de guilde : mourir face au Dragon ne coûte plus rien (ni niveau, ni XP, ni objet). Retour direct au hall de guilde, 45 secondes d'attente avant de pouvoir y retourner.
- 4 donjons intermédiaires (entre le Terrier des Gobelins et les donjons de fin), qui s'ouvrent rarement sur les monstres de la Forêt des Murmures et du Canyon de Rouille :
  - Bosquet des Ronces (la Mère des Ronces) : les ronces ralentissent et piquent.
  - Sanctuaire des Lucioles (le Gardien Luciole) : autels à activer avec E, +30 % de dégâts pendant 20 s.
  - Mine Effondrée (le Contremaître de Pierre) : éboulements annoncés au sol.
  - Forge Rouillée (l'Automate Forgeron) : grilles qui crachent de la vapeur par intermittence.
  - Chaque boss donne à coup sûr une potion de caractéristique aléatoire.
- Royaume 3 fois plus grand, généré au hasard à chaque redémarrage du serveur (même carte pour tous les joueurs).
- Chemins de terre à travers le royaume : +30 % de vitesse dessus.
- Brouillard de guerre sur la minimap : elle se dévoile en explorant (carte entière visible en admin).
- Nouveaux boss centraux, nouveaux sprites et nouvelles attaques : ils n'existent plus au départ. Tous les 20 monstres tués, l'un des deux apparaît au hasard, signalé par un marqueur et une flèche.
- Familiers renommés et redessinés : Rat des brumes, Tortue rouge, Fourmi noire, Lion… Leur sprite évolue à chaque rang au lieu de simplement grossir.
- Correctif : certaines infos envoyées par les joueurs étaient coupées par le serveur (boss, compteur de monstres, donjons).

## ver.0.0.8 (server.js modifié)
- Le Dragon baisse et secoue la tête quand il attaque.
- Nouvelle musique du Dragon, plus posée et orchestrale (taikos, gong, chœurs, cor).
- La lave se traverse mais brûle ; au-delà, une corniche de roche permet de souffler.
- Combat du raid ramené à 5 minutes.
- Projectiles du Dragon en forme de flammes animées, éruptions de feu à la place des éclairs.

## ver.0.0.7 (server.js modifié)
- Nouveau Dragon de Guilde : grand dragon rouge aux ailes battantes, gueule qui crache le feu quand il attaque.
- Le portail s'ouvre au lancement du raid, le Dragon arrive 30 secondes plus tard : grondements, écran qui tremble, rugissement et flash à son apparition.
- Musique épique : tambours de guerre pendant l'attente, puis thème du Dragon (galop de batterie, taikos, chœurs et cuivres).
- Nouvelles attaques de feu : souffle qui balaie l'arène, lignes de flammes qui jaillissent du sol, anneaux de braises, pluie de météores, boules de feu qui explosent. Tout traverse les murs.
- Antre du Dragon : arène bien plus grande, entourée de lave, avec des brasiers et des tas d'or.

## ver.0.0.6 (server.js modifié)
- Le raid de guilde devient un événement de 10 minutes lancé par un admin (bouton dans le panneau admin).
- Nouveau boss : le Dragon de Guilde, 2 fois plus grand, pixels doublés, animation d'attaque (ailes et souffle).
- Le Dragon est invulnérable : chaque guilde fait son maximum de dégâts, classement en direct dans l'arène.
- Ses attaques traversent les murs : souffle en éventail avec des trous, anneau avec une brèche, pluie de météores, double spirale.
- Fin des 10 minutes : le Dragon s'envole et le classement des guildes s'affiche pour tout le monde.
- Récompenses selon la place de la guilde, pour chaque joueur ayant frappé le Dragon.

## ver.0.0.5 (server.js modifié)
- Clic sur le nom d'un joueur dans la liste : menu Groupe, Échange, Duel, Rejoindre, Guilde.
- Groupes (6 joueurs max) : en entrant dans le Royaume, on arrive à côté d'un membre du groupe déjà sur place. Noms des membres en vert.
- Guildes (20 membres) : portail « Guilde » à côté de la maison, création pour 500 pièces, invitation depuis la liste des joueurs, tag affiché devant le pseudo.
- Hall de guilde : feu de camp, bannières, tableau de guilde (membres, dégâts), coffre du raid, portail du raid.
- Raid hebdomadaire : le Titan de la Guilde a une réserve de vie commune pour toute la semaine (1 000 000 PV, +30 % à chaque victoire). Victoire = récompense pour chaque participant au coffre du hall.

## ver.0.0.4
- Un seul œuf de familier : l'ouverture chez l'Éleveur tire l'un des 6 familiers (même chance pour chacun), au tier Commun.
- Évolution dans le parc de la maison : 3 familiers identiques + 1 croquette = 1 familier du tier supérieur (Commun → Rare → Épique).
- Croquette de familier en vente chez le marchand : 500 pièces.
- Chaque tier agrandit le familier : contour lumineux au Rare, couronne à l'Épique.
- Option « Masquer les familiers des autres joueurs ».
- Les anciens œufs deviennent des œufs de familier normaux.

## ver.0.0.3
- Familiers : raretés Commun / Rare / Épique (Ultime bientôt). Plus la rareté est haute, plus le bonus est grand (Rare ×1,6, Épique ×2,4).
- Éclosion façon « ouverture de caisse » chez l'Éleveur : la bande défile et s'arrête sur la rareté obtenue (65 % / 28 % / 7 %).
- Pêche : lac dans la maison (10 poissons d'eau douce) et mer du Royaume depuis la plage (10 poissons de mer). 4 communs, 3 rares, 2 épiques, 1 légendaire par lieu, avec des poids réalistes.
- Tableau de pêche dans la maison : espèces attrapées, record de poids et nombre de prises.

## ver.0.0.2
- Nouvelle statistique **Armure** : retire des dégâts à chaque coup reçu (au moins 15 % passent toujours). Armures lourdes > cuir > robes ; le Guerrier en a le plus de base.
- **Gloire** au niveau 20 : l'XP remplit une jauge dorée ; chaque jauge pleine = 1 point de gloire = +2 prestige à la mort définitive.
- Classement : « Précision » retiré, « Top Prestige gagné » compte tout le prestige gagné depuis le début.
- La salle des coffres devient **ta Maison** : coffres, parc des familiers clôturé et 4 styles de décoration (Chalet, Château, Cabane sylvestre, Sanctuaire astral).
- **Familiers** : 6 œufs (0,1 % sur tous les monstres), l'Éleveur du Nexus les fait éclore. Le familier équipé te suit et augmente une statistique au-delà du maximum ; les autres vivent dans ton parc.

## ver.0.0.1
- Reine des Glaces (Caverne Gelée) moins forte : moins de vie, moins de dégâts, tirs plus espacés.
- Jardins Célestes : contour noir épais autour des projectiles et des éclairs pour mieux les voir.
- Correctif : les monstres d'un donjon ne disparaissent plus quand un joueur meurt ou quitte le donjon.
- Nouvelle touche « Tout ramasser » : G (E sert aux portails). Réglable dans Options > Touches.
- Fin de donjon : retour dans le Royaume, à l'endroit du portail, au lieu du Nexus.
- Numéro de version affiché en bas à gauche de l'écran.
