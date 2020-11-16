
const fetch = require('node-fetch');

export interface PartialGuildResponse {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export class DiscordAPI  {

    baseUrl: string;
    accessToken: string;

    constructor(accessToken :  string){
        this.baseUrl = `https://discord.com/api`;
        this.accessToken = accessToken;
    }

    async getPartialGuilds() : Promise<PartialGuildResponse[]> {

        const response = await fetch(`${this.baseUrl}/users/@me/guilds`, {
            method: 'get',
            headers: {'Authorization': `Bearer ${this.accessToken}`}
            });

        return await response.json() as Promise<PartialGuildResponse[]>;
    }

}