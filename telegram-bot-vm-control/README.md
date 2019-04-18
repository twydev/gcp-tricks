### Telegram Bot Backend: GCP Compute VM Controller
 
This is the backend for a Telegram bot that helps to power up and down GCP VM using Compute API.

First register a bot with Telegram bot father, take note of the bot token id.  Follow this guide: https://core.telegram.org/bots

Next use webhook to make Telegram bot forward all messages to this Cloud Function endpoint. Refer to the API documentation https://core.telegram.org/bots/api#setwebhook

Use this backend script to trigger the necessary actions and respond to the bot. Use testing.json to test your backend on Cloud Function console.
