import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { DiscordGuild, DiscordGuildMember, DiscordGuildRole, getAuthToken } from '../types'
import { DiscordAPI, PartialDiscordGuildMember, PartialGuildResponse } from '../../discordAPI'

@Resolver()
export class GuildResolver {
  @Query(() => [DiscordGuild], { nullable: true })
  async guilds (
    @Ctx() { req }: any
  ) {
    const token = getAuthToken(req)

    if (!token) return null

    const discord = new DiscordAPI(token)
    const partialGuilds : PartialGuildResponse[] = await discord.getPartialGuilds()
    const guilds : DiscordGuild[] = []

    for (let i = 0; i < partialGuilds.length; i++) {
      guilds.push({
        id: partialGuilds[i].id,
        name: partialGuilds[i].name,
        icon: partialGuilds[i].icon ? `https://cdn.discordapp.com/icons/${partialGuilds[i].id}/${partialGuilds[i].icon}.png` : null,
        owner: partialGuilds[i].owner
      })
    }

    return guilds
  }

  @Query(() => [DiscordGuildMember], { nullable: true })
  async guildMembers (
    @Ctx() { req }: any,
    @Arg('guildId') guildId: string
  ) {
    const token = getAuthToken(req)
    if (!token) return null
    // console.log(process.env.)
    console.log(token)

    const discord = new DiscordAPI(token)
    const guildRoles : DiscordGuildRole[] = await discord.getGuildRoles(guildId)
    console.log(guildRoles)
    const partialGuildMembers : PartialDiscordGuildMember[] = await discord.getPartialGuildMembers(guildId)
    console.log(partialGuildMembers)

    const members : DiscordGuildMember[] = []

    for (let i = 0; i < partialGuildMembers.length; i++) {
      members.push({
        user: partialGuildMembers[i].user,
        nickname: partialGuildMembers[i].nickname,
        joinedAt: partialGuildMembers[i].joinedAt,
        roles: guildRoles
          .filter((role) => partialGuildMembers[i].roles
            .some(value => role.id === value))
      })
    }

    return members
  }
}
