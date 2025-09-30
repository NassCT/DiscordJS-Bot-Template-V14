const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
require('dotenv').config();

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                if (command.data instanceof SlashCommandBuilder) {
                    client.commandArray.push(command.data.toJSON());
                } else {
                    client.commandArray.push(command.data);
                }
            }
        }

        // Vérifier si le token et client_id sont disponibles avant d'enregistrer les commandes
        if (!process.env.TOKEN || !process.env.CLIENT_ID) {
            console.log('⚠️ TOKEN ou CLIENT_ID manquant - enregistrement des commandes ignoré');
            return;
        }

        const rest = new REST({
            version: '10'
        }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: client.commandArray
                },
                );
                console.log('Successfully reloaded application (/) commands.');

            } catch (error) {
                console.error(error);
            }
        })();
    };
};