export async function sendDiscordMessage(body: { content: string, embeds?: { title?: string, description?: string, color?: number, author: { name?: string } }[], attachments?: string[] }) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
    if (!webhookUrl) throw new Error("No se ha definido la URL del webhook de Discord");

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error al enviar mensaje a Discord: ${errorData}`);
    }
}
