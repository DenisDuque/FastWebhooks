const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

/**
 * Busca un archivo de comando en el directorio especificado y sus subdirectorios.
 * 
 * @param {string} dir - El directorio donde buscar.
 * @param {string} name - El nombre del comando a buscar (sin extensión).
 * @returns {string|null} - La ruta al archivo del comando o null si no se encuentra.
 */

function findCommandFile(dir, name) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            const result = findCommandFile(fullPath, name);
            if (result) return result;
        } else if (file.endsWith('.js') && file.replace('.js', '').toLowerCase() === name) {
            return fullPath;
        }
    }

    return null;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();

        const commandFilePath = findCommandFile(path.join(__dirname, '..', 'commands'), commandName);

        if (!commandFilePath) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

        delete require.cache[require.resolve(commandFilePath)];

        try {
            const newCommand = require(commandFilePath);
            
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading the command \`${commandName}\`:\n\`${error.message}\``);
        }
    },
};
