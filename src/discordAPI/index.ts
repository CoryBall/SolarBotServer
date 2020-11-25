import { DiscordGuildRole, DiscordUser } from '../graphql/types'

const fetch = require('node-fetch')

export interface PartialGuildResponse {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
}

export interface PartialDiscordGuildMember {
  user: DiscordUser;
  nickname: string;
  roles: string[];
  joinedAt: Date;
}

export class DiscordAPI {
    baseUrl: string;
    accessToken: string;

    constructor (accessToken : string) {
      this.baseUrl = 'https://discord.com/api'
      this.accessToken = accessToken
    }

    async getPartialGuilds () : Promise<PartialGuildResponse[]> {
      const response = await fetch(`${this.baseUrl}/users/@me/guilds`, {
        method: 'get',
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      return await response.json() as Promise<PartialGuildResponse[]>
    }

    async getGuildRoles (guildId: string) : Promise<DiscordGuildRole[]> {
      const response = await fetch(`${this.baseUrl}/guilds/${guildId}/roles`, {
        method: 'get',
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      return await response.json() as Promise<DiscordGuildRole[]>
    }

    async getPartialGuildMembers (guildId: string) : Promise<PartialDiscordGuildMember[]> {
      const response = await fetch(`${this.baseUrl}/guilds/${guildId}/members`, {
        method: 'get',
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      return await response.json() as Promise<PartialDiscordGuildMember[]>
    }
}
