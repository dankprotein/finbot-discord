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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('expense-list')
        .setDescription('List your recent expenses'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const expenses = getExpenses(userId);

        if (expenses.length === 0) {
            await interaction.reply('No expenses found.');
            return;
        }

        const lastFive = expenses.slice(-5).map((exp, index) => {
            const date = new Date(exp.timestamp).toLocaleDateString();
            return `${expenses.length - 5 + index + 1}. ₹${exp.amount} - ${exp.category} [${date}]`;
        });

        await interaction.reply(`Recent Expenses:\n${lastFive.join('\n')}`);
    }
};
