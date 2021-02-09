# Initialisation

Entrer les commandes suivantes depuis la racine:
```sh
    cd docker # on place le terminal dans le dossier contenant le fichier docker-compose
    docker-compose build
    docker-compose up -d # lancement de mysql et de phpmyadmin
    chmod +rx createTable.sh # autorisation de l'execution du script qui creera les tables dans la db
    ./createTable.sh # creation des tables a partir du fichier SQL
    cd .. # retour au dossier racine
```

# Installation et lancement de l'API

Dans mon email, j'ai aussi joint un fichier `.env` qui est a place dans la racine afin que l'API fonctionne. 
```sh
    npm install
    npm run start
```

L'API se lancera donc en http://localhost:8080/.

# Routes de l'API

Les routes sont ecrites dans le dossier `/src/routes` et sont compose de :
 * **/images**: contenant les requetes concernant les images, donc mettre en ligne une image, attribuer un `nom`, `type` etc.
 * **/tags**: compose d'un nom unique
 * **/datasets**: afin de former des groupes d'images, compose d'un `nom de groupe` et des `id` des images 
 * **/version**: contient toutes les versions des images,compose des `tags`, `id` des images et du `numero de version`

 Afin de tester l'API, j'ai utilise **Postman**, dont le JSON des test est dans ce [fichier](public/dataguru.postman_collection.json). Les fichiers `image` uploade sont stockes dans le dossier `public/images/upload`

Si vous rencontrez des problemes pour lancer l'API, n'hesitez pas a m'envoyer un mail.