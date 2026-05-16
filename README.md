# DiscordJS-Bot-Template-V14

Template de bot Discord utilisant Discord.js v14, avec support Docker et Puppeteer.

## Fonctionnalités

- Gestion modulaire des commandes slash et événements
- Chargement dynamique des commandes par dossier
- Support Puppeteer (scraping web avec Chromium headless)
- Dockerisé avec Docker Compose
- Gestion propre des erreurs et arrêt gracieux (SIGTERM/SIGINT)
- Rotation automatique des statuts du bot

## Prérequis

- [Node.js](https://nodejs.org/) >= 18.0.0 (recommandé : 22 LTS)
- [Docker](https://www.docker.com/) et Docker Compose (optionnel, pour le déploiement conteneurisé)

## Installation

1. Cloner le dépôt :

```sh
git clone https://github.com/NassCT/DiscordJS-Bot-Template-V14.git
cd DiscordJS-Bot-Template-V14
```

2. Installer les dépendances :

```sh
npm install
```

3. Configurer les variables d'environnement :

```sh
cp src/.env.example .env
```

4. Remplir le fichier `.env` :

```env
TOKEN="votre-token-discord"
CLIENT_ID="id-de-votre-application"
GUILD_ID="id-de-votre-serveur"
```

## Utilisation

### Développement local

```sh
# Démarrer le bot
npm start

# Démarrer en mode watch (redémarrage auto sur modification)
npm run dev
```

### Docker

```sh
# Construire et lancer
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter
docker compose stop

# Reconstruire après modification
docker compose up -d --build
```

## Structure du projet

```
├── .dockerignore
├── .env                    # Variables d'environnement (non versionné)
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── src/
    ├── .env.example        # Template des variables d'environnement
    ├── index.js            # Point d'entrée principal
    ├── commands/
    │   └── public/
    │       └── ping.js     # Commande /ping (exemple)
    ├── events/
    │   ├── interactionCreate.js
    │   └── ready.js
    └── functions/
        ├── handelCommands.js
        └── handelEvents.js
```

## Ajouter une commande

Créer un fichier dans `src/commands/<catégorie>/` :

```javascript
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ma-commande")
    .setDescription("Description de la commande"),

  async execute(interaction) {
    await interaction.reply("Réponse !");
  },
};
```

Les commandes sont automatiquement chargées et enregistrées auprès de l'API Discord au démarrage.

## Docker

L'image utilise Node.js 22 Alpine avec Chromium pré-installé pour Puppeteer. Le bot tourne en tant qu'utilisateur non-root pour la sécurité.

| Variable d'environnement | Description |
|--------------------------|-------------|
| `TOKEN` | Token du bot Discord |
| `CLIENT_ID` | ID de l'application Discord |
| `GUILD_ID` | ID du serveur (optionnel) |
| `NODE_ENV` | Défini à `production` dans Docker |

## Auteur

Développé par [NassCT](https://github.com/NassCT)

## Contact

Discord : @nassct
