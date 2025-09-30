const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Renvoie la latence du bot."),

  async execute(interaction) {
    // Méthode plus robuste pour calculer la latence
    const start = Date.now();
    
    await interaction.reply({ content: "Pong! Calcul de la latence...", flags: 64 });
    
    const end = Date.now();
    const latency = end - start;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.editReply(`🏓 Pong!\n📡 Latence API: ${latency}ms\n 💓 Bot: ${apiLatency}ms`);
  },
};
