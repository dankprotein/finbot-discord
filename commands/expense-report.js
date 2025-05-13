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
        .setName('expense-report')
        .setDescription('Show a summary of this month\'s spending'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const allExpenses = getExpenses(userId);

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthlyExpenses = allExpenses.filter(exp => {
            const date = new Date(exp.timestamp);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        if (monthlyExpenses.length === 0) {
            await interaction.reply('No expenses recorded this month.');
            return;
        }

        let total = 0;
        const categories = {};

        for (const exp of monthlyExpenses) {
            total += exp.amount;
            const cat = exp.category.toLowerCase();
            categories[cat] = (categories[cat] || 0) + exp.amount;
        }

        // Sort categories by amount (descending)
        const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);

        const lines = [
            `Monthly Report (${now.toLocaleString('default', { month: 'long' })}):`,
            `Total Spent: ₹${total.toFixed(2)}`,
            `Top Categories:`
        ];

        for (const [cat, amt] of sortedCategories) {
            lines.push(`- ${cat}: ₹${amt.toFixed(2)}`);
        }

        await interaction.reply(lines.join('\n'));
    }
};
