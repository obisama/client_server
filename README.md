                                Project Programmable Web Client / Server


Réalisé par :

        Abdelmoughit AFAILAL
        Fadoua BERREHILI
        Mohammed BOURAGBA
        
- Contexte du projet:

L'objectif de notre application est de fournir à l'utilisateur un outil pour visualiser les informations 
sur les accidents de la route, chose qui va lui permettre d'éviter les routes dangereuse.
	On distingue entre deux utilisateurs
  
	 - Utilisateur normal:
                    * Enregistrement
                    * Authentification
                    * Editer son profil
                    * Visualisation des accidents (Map, liste)
                    * Ajouter les commentaires.
	 - Administrateur:
                    * Authentification
                    * Ajout des admins
                    * Editer les simples utilisateurs
                    * Editer les accidents ( gravité, numéro et coordonnées)
                    * Visualiser les accidents, (Map, Liste)

- Les technologies utilisées:

     - Front end:
          * Angular1
          * Boostrap 
          * Guip
     - Back end:
          * NodeJs
          * Data base (Mongodb) 

- Fonctionnement:
     - Database: 
         1) We used Mongo As database, the data is on the /back/DATA/MongoData
         2) we used version : 3.2.18 ( In case of problem, You can download it from : https://www.mongodb.com/download-center#previous )
    - Serveur 
         1) Se positionner dans le dossier Server.
         2) Installer les packages NodeJs : "npm install"
         3) Démarrer la base de données : "mongod --dbpath "chemin pour les données"" (data est recuperable depuis https://drive.google.com/open?id=17zdvsPqb0001afLA0RdVnnsCSeZ0SgId)
         4) "node server.js" .
     - Client
         1) Il faut accéder au dossier front: "cd ../front"
         2) "npm install"
         3) "bower install"
         4) "gulp install"
         6) "gulp build"
         7) "guilp"
         8) le serveur sera accessible depuis : http://localhost:8888/
