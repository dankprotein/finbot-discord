# FinBot – Personal Finance Tracker Discord Bot

FinBot is a professional Discord bot built with JavaScript and Node.js that helps you track your personal expenses directly from Discord using slash commands.

It allows users to log, view, summarize, and delete expenses. All user data is stored locally using JSON.

---

## 🚀 Features

- **Add Expense**  
  `/expense-add 250 groceries` – Log a new expense.

- **List Expenses**  
  `/expense-list` – Show recent expenses.

- **Delete Expense**  
  `/expense-delete 2` – Delete an expense by index.

- **Summary**  
  `/expense-summary` – Get total and category-wise breakdown.

- **Monthly Report**  
  `/expense-report` – View spending for the current month.

---

## 📦 Tech Stack

- JavaScript (Node.js)
- [discord.js](https://discord.js.org/)
- JSON for local storage
- dotenv for environment variables

---

## 📁 Project Structure

Finflow V8/
├── commands/ # Slash commands
├── data/expenses.json # Local database (not tracked)
├── index.js # Entry point
├── .env # Secret token (not committed)
├── .gitignore # Files to ignore in Git
└── README.md # Project info

## 🛠 Setup Instructions

```bash
git clone https://github.com/yourusername/finbot.git
cd finbot
npm install