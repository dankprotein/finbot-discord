const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with I\'m here!'),

    async execute(interaction) {
        await interaction.reply("I'm here!");
    }
};
