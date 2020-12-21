import glob from 'glob';
import { promisify } from 'util'
import {Command} from "./types";
import {Message, Client} from "discord.js";

const globPromise = promisify(glob)

const commands: Command[] = []

export default async () => {
  const client = new Client()
  const discordPrefix: string = process.env.DISCORD_BOT_PREFIX!;

  client.once('ready', async () => {
    console.log('Discord.Js Initiated')
    const commandFiles = await globPromise(`${__dirname}/commands/*.{js,ts}`);

    for (const file of commandFiles){
      const command = await import(file) as Command
      commands.push(command)
    }
  })

  client.on('message', (message: Message) => {
    if (!message.content.startsWith(discordPrefix) || message.author.bot) return;

    const [commandName, ...args] = message.content
        .slice(discordPrefix.length)
        .split(/ +/)

    const command = commands.find(c => c.name == commandName)

    if (command) {
      command.execute(message, args)
    }
  })

  await client.login(process.env.DISCORD_BOT_TOKEN)
}
