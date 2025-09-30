const { InteractionResponseFlags } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            // Vérifier si l'interaction n'a pas déjà été répondue
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: InteractionResponseFlags.Ephemeral
                });
            }
        }
    },
};