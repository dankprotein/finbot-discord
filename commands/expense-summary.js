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
        .setName('expense-summary')
        .setDescription('View your total spending and category-wise breakdown'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const expenses = getExpenses(userId);

        if (expenses.length === 0) {
            await interaction.reply('No expenses to summarize.');
            return;
        }

        let total = 0;
        const categories = {};

        for (const exp of expenses) {
            total += exp.amount;
            const cat = exp.category.toLowerCase();
            categories[cat] = (categories[cat] || 0) + exp.amount;
        }

        const lines = [`Total Spent: ₹${total.toFixed(2)}`, 'Category Breakdown:'];
        for (const [cat, amt] of Object.entries(categories)) {
            lines.push(`- ${cat}: ₹${amt.toFixed(2)}`);
        }

        await interaction.reply(lines.join('\n'));
    }
};
