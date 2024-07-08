/**
 * Busca un canal en el cliente de Discord utilizando su ID.
 * 
 * @param {Object} client - El cliente de Discord.
 * @param {string} channelId - El ID del canal a buscar.
 * @returns {Promise<Channel|null>} - El objeto Channel si se encuentra, o null si no.
 */
async function findChannel(client, channelId) {
    try {
        const channel = await client.channels.fetch(channelId);
        return channel;
    } catch (error) {
        console.error('Failed to fetch channel:', error);
        return null;
    }
}

module.exports = { findChannel };
