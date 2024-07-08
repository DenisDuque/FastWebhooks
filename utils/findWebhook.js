/**
 * Busca un webhook específico por nombre en el canal dado y devuelve el objeto del webhook.
 * 
 * @param {Object} channel - El canal en el que buscar los webhooks.
 * @param {string} webhookName - El nombre del webhook a buscar.
 * @returns {Promise<Object|null>} - El objeto del webhook encontrado o null si no se encuentra.
 */
async function findWebhook(channel, webhookName) {
    try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wb => wb.name.toLowerCase() === webhookName.toLowerCase());
        return webhook || null;
    } catch (error) {
        throw new Error('Error al buscar el webhook: ' + error.message);
    }
}

module.exports = { findWebhook };