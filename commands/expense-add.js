const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'expenses.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.dirname(dataPath))) fs.mkdirSync(path.dirname(dataPath));
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify({}));

function saveExpense(userId, expense) {
    const raw = fs.readFileSync(dataPath);
    const data = JSON.parse(raw);
    if (!data[userId]) data[userId] = [];
    data[userId].push(expense);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('expense-add')
        .setDescription('Add a new expense')
        .addNumberOption(option => 
            option.setName('amount').setDescription('Amount spent').setRequired(true))
        .addStringOption(option =>
            option.setName('category').setDescription('Expense category').setRequired(true)),

    async execute(interaction) {
        const userId = interaction.user.id;
        const amount = interaction.options.getNumber('amount');
        const category = interaction.options.getString('category');
        const timestamp = new Date().toISOString();

        const expense = { amount, category, timestamp };

        saveExpense(userId, expense);
        await interaction.reply(`Added ₹${amount} under '${category}'`);
    }
};
