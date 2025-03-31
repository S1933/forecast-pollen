# Application de Prévisions de Pollen

Cette application web permet de consulter les prévisions de pollen pour différentes villes en France. Elle utilise l'API Google Maps Pollen pour fournir des informations précises sur les niveaux de pollen, les types de pollen présents et les recommandations de santé associées.

## Fonctionnalités

- Consultation des prévisions de pollen sur 5 jours
- Sélection parmi plusieurs grandes villes françaises
- Affichage des différents types de pollen (graminées, arbres, herbacées)
- Indications sur les niveaux de pollen avec code couleur
- Recommandations de santé personnalisées
- Informations sur les plantes allergènes en saison

## Architecture technique

L'application est construite avec une architecture moderne en microservices :

- **Frontend** : Application React servie par Nginx
- **Backend** : API REST Node.js/Express
- **Déploiement** : Conteneurs Docker orchestrés avec Docker Compose

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Une clé API Google Maps Pollen valide

## Installation et démarrage

1. Clonez ce dépôt :
   ```
   git clone https://github.com/votre-utilisateur/pollen-app.git
   cd pollen-app
   ```

2. Configurez votre clé API dans le fichier `.env` du backend :
   ```
   GOOGLE_POLLEN_API_KEY=votre_clé_api_ici
   PORT=3000
   ```

3. Lancez l'application avec Docker Compose :
   ```
   docker-compose up --build
   ```

4. Accédez à l'application dans votre navigateur :
   ```
   http://localhost:8080
   ```

## Structure du projet