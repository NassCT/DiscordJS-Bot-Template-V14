const { ActivityType } = require('discord.js');

module.exports = {
    name: 'clientReady',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        // Exemple de statuts (vous pouvez personnaliser cette liste)
        const statusArray = [
            {
                content: "avec Discord.js 14.22.1",
                type: ActivityType.Playing,
                status: "online"
            },
            {
                content: "les utilisateurs",
                type: ActivityType.Watching,
                status: "idle"
            },
            {
                content: "de la musique",
                type: ActivityType.Listening,
                status: "dnd"
            }
        ];

        async function pickPresence() {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,
                        },
                    ],
                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }

        // Définir un statut initial
        await pickPresence();
        
        // Changer le statut toutes les 30 secondes (optionnel)
        setInterval(pickPresence, 30000);
    },
};