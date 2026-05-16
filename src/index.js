const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const functions = fs.readdirSync(path.join(__dirname, "functions")).filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

// Gestion des erreurs non gérées
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

// Arrêt propre
function gracefulShutdown(signal) {
    console.log(`Signal ${signal} reçu. Arrêt...`);
    client.destroy();
    process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

(async () => {
    for (const file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, path.join(__dirname, "events"));
    client.handleCommands(commandFolders, path.join(__dirname, "commands"));
    
    // Vérifier si le token est disponible avant de tenter la connexion
    if (!process.env.TOKEN) {
        console.error('❌ Erreur: TOKEN manquant dans le fichier .env');
        console.log('📝 Veuillez ajouter votre token Discord dans le fichier .env');
        process.exit(1);
    }
    
    client.login(process.env.TOKEN);
})();
