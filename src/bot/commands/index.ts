import Discord from "discord.js";

const discordPrefix: string = process.env.DISCORD_BOT_PREFIX!

export function loadInteractions(client: Discord.Client) {
    client.on('message', async (message: Discord.Message) => {
        if (message.content.startsWith(discordPrefix) || message.author.bot) return;

        // if (message.content === '!dateJoined'){
        //     await dateJoined(message)
        // }
    })
}


