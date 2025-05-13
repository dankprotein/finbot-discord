# FinBot – Personal Finance Tracker Discord Bot

FinBot is a professional Discord bot built with JavaScript and Node.js that helps you track your personal expenses directly from Discord using slash commands.  
It allows users to log, view, summarize, and delete expenses. All user data is stored locally using JSON.

---

## 🚀 Features

- `/expense-add 250 groceries` – Log a new expense  
- `/expense-list` – Show recent expenses  
- `/expense-delete 2` – Delete an expense by index  
- `/expense-summary` – Get total and category-wise breakdown  
- `/expense-report` – View spending for the current month  

---

## 📦 Tech Stack

- JavaScript (Node.js)  
- [discord.js](https://discord.js.org)  
- JSON for local storage  
- dotenv for environment variables  

---

## 📁 Project Structure
finbot-discord/
├── commands/            # Slash commands
├── data/expenses.json   # Local database (auto-generated, not tracked)
├── index.js             # Entry point
├── .env                 # Secret token (not committed)
├── .gitignore           # Files to ignore in Git
└── README.md            # Project info

---

## 🛠 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dankprotein/finbot-discord.git
   cd finbot-discord
  
2.	Install dependencies
    bash
    npm install
3.	Create a Discord Bot
	•	Go to Discord Developer Portal
	•	Create a new application and bot
	•	Copy the bot token

4.	Set up environment variables
	•	Create a .env file in the root folder
	•	Add the following line:
    DISCORD_TOKEN=your-bot-token-here

5.	Invite your bot to a server
	•	Under OAuth2 > URL Generator:
	•	Select bot and applications.commands scopes
	•	Give your bot Send Messages, Use Slash Commands, etc.
	•	Open the generated URL and invite the bot to your server

6.	Run the bot
    bash
    node index.js