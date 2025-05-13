const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Replies with client uptime'),
    async execute(interaction) {
        const uptime = interaction.client.uptime;

        const seconds = Math.floor((uptime / 1000) % 60);
        const minutes = Math.floor((uptime / (1000 * 60)) % 60);
        const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

        const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

        await interaction.reply(`Uptime: ${uptimeString}`);
    },
};