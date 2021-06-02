import {Message} from "discord.js";
import {Command} from "../types";
import {getRepository} from "typeorm";
import {DiscordUser} from "../../models/discordUser";
import * as argon2 from 'argon2'
import { v4 as uuid } from 'uuid';
// const XIVAPI = require('xivapi-js')

// const xiv = new XIVAPI();

const command: Command = {
  name: 'connectLodestone',
  description: 'Starts the process of connecting your discord account to your lodestone character. Put the token in your lodestone bio and run !confirmLodestone after.',
  usage: '"!connectLodestone"',
  async execute(message: Message, args: string[]) {
    const lodestoneServer = args[0];
    const lodestoneName = args.slice(1).join(' ')

    if (!lodestoneName || !lodestoneServer){
      message.member?.send('connectLodestone was ran incorrectly. Try "!connectLodestone <FFXIV Server> <FFXIV name>')
    }

    // const playerResponse = xiv.

    const userRepository = getRepository(DiscordUser)
    let discordUser: DiscordUser | undefined;
    try{
      discordUser = await userRepository.findOne({discordId: message.member?.id})
    } catch (e){
      console.error(e)
    }
    if (!discordUser) {
      const newUser: DiscordUser = {
        id: uuid(),
        created: new Date(),
        modified: new Date(),
        deleted: false,
        discordId: message.member?.id!,
        username: message.member?.user.username!,
        discriminator: message.member?.user.discriminator!,
        avatarUrl: message.member?.user.avatarURL()!,
        isConfirmed: false,
        authToken: '',
        lodestoneId: '',
        lodestoneHash: await argon2.hash(message.member?.id!),
      }
      discordUser = newUser
      try {
        await userRepository.create(newUser)
      } catch (e){
        console.error(e)
      }
    }
    if (discordUser.isConfirmed) {
      message.member?.send('Your lodestone has already been connected. Run "!removeLodestone" in the server to remove your connection.')
    } else {
      message.member?.send(`Your lodestone token is ${discordUser.lodestoneHash}\nPut this in your Lodestone bio and run !confirmLodestone to complete the process!`)
    }
  }
}

export = command