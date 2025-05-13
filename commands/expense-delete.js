const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'expenses.json');

function getExpenses(userId) {
    if (!fs.existsSync(dataPath)) return [];
    const raw = fs.readFileSync(dataPath);
    const data = JSON.parse(raw);
    return data[userId] || [];
}

function saveExpenses(userId, expenses) {
    const raw = fs.readFileSync(dataPath);
    const data = JSON.parse(raw);
    data[userId] = expenses;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('expense-delete')
        .setDescription('Delete an expense by its index (from /expense-list)')
        .addIntegerOption(option =>
            option.setName('index').setDescription('Expense index to delete').setRequired(true)),

    async execute(interaction) {
        const userId = interaction.user.id;
        const index = interaction.options.getInteger('index');

        const expenses = getExpenses(userId);

        if (index < 1 || index > expenses.length) {
            await interaction.reply('Invalid index. Use /expense-list to see valid indexes.');
            return;
        }

        const removed = expenses.splice(index - 1, 1)[0];
        saveExpenses(userId, expenses);

        await interaction.reply(`Deleted: ₹${removed.amount} - ${removed.category}`);
    }
};
