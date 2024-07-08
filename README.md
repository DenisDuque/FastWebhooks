# FastWebhooks

FastWebhooks is a Discord bot that allows the creation of multiple webhooks in a Discord channel using a JSON file. This bot is useful for automating webhook management in Discord servers.

## Requirements

- Node.js (version 16.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tu-usuario/fastwebhooks.git
   ```
2. **Navigate to the project directory**

   ```bash
    cd fastwebhooks 
    ```

3. **Install the dependencies**

   ```bash
    npm install
    ```

4. **Configure the .env file**

   ```env
    DISCORD_TOKEN=your_discord_token_here
    ```

## Usage

1. **Prepare the JSON file** \
Create a JSON file with the webhook configuration. Example of webhooks.json:
    ```json
    {
        "webhooks": [
            {
                "name": "Webhook1",
                "avatar": "AVATAR_URL"
            },
            {
                "name": "Webhook2",
                "avatar": "AVATAR_URL"
            },
            {
                "name": "Webhook3"
            }
        ]
    }
    ```
    **Parameters**\
    *name:* The name of the webhook. \
    *avatar:* The URL of the webhook's avatar (optional).

2. **Run the bot**\
Start the bot using the following command:
    ```bash
    node index.js
    ```

## Commands

**/setup**\
Create multiple webhooks in this channel using a JSON file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.