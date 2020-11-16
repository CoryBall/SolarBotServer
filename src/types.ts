import Discord from "discord.js";




let client : Discord.Client = new Discord.Client();

export function getDiscordClient () : Discord.Client {
    return client;
}

export function setDiscordClient (newClient : Discord.Client) : void {
    client = newClient;
}

