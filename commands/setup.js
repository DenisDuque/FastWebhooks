const { SlashCommandBuilder } = require('discord.js');
const { findChannel } = require('../utils/findChannel');
const { findWebhook } = require('../utils/findWebhook');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Create multiple webhooks in this channel using a JSON file.')
        .addAttachmentOption(option => 
            option.setName('webhooks_file')
                .setDescription('JSON file of webhooks data')
                .setRequired(true)
        ),
    async execute(interaction) {
        const channelId = interaction.channelId;
        const attachment = interaction.options.getAttachment('webhooks_file');

        if (!attachment || !attachment.name.endsWith('.json')) {
            await interaction.reply('Please provide a valid JSON file.');
            return;
        }

        const response = await fetch(attachment.url);
        if (!response.ok) {
            await interaction.reply('Failed to download the JSON file.');
            return;
        }

        let webhooks;
        try {
            webhooks = await response.json();
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            await interaction.reply('Invalid JSON format. Please provide a valid JSON file.');
            return;
        }

        const channel = await findChannel(interaction.client, channelId);

        if (!channel) {
            console.log('Channel is null.');
            await interaction.reply('Could not find the channel.');
            return;
        }
        
        for (const webhookData of webhooks.webhooks) {
            try {
                const avatarUrl = webhookData.avatar;

                const webhookExists = await findWebhook(channel, webhookData.name);
                if (webhookExists === null) {
                    const webhook = await channel.createWebhook({
                        name: webhookData.name,
                        avatar: avatarUrl
                    });
    
                    console.log(`Created webhook ${webhookData.name}`);
                } else {
                    console.log(`Skipping webhook ${webhookData.name}, it already exists on this channel.`);
                }
            } catch (error) {
                console.error(`Failed to create webhook ${webhookData.name}:`, error);
                await interaction.followUp(`Failed to create webhook ${webhookData.name}.`);
                return;
            }
        }

        await interaction.reply({ content: 'Webhooks have been set up successfully.', ephemeral: true });
    },
};
