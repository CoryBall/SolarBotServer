import {Message, MessageEmbed} from "discord.js";
import {Command} from "../types";
import {promisify} from "util";
import glob from "glob";

const globPromise = promisify(glob)

let commands: Command[] = []

const command: Command = {
    name: 'help',
    description: 'DMs user a list of all commands and how to use them.',
    usage: '"!help" or "!help <command>"',
    async execute(message: Message, args: string[] | undefined) {
        commands = []
        let embeddedMessage = new MessageEmbed()
            .setTitle('SolarBot command helper');

        const commandFiles = await globPromise(`${__dirname}/*.{js,ts}`);
        for (const file of commandFiles){
            const command = await import(file) as Command
            commands.push(command)
        }

        if (args && args.length !== 0){
            console.log('commands: ', commands.map((command) => command.name))
            const command = commands.find((command: Command) => command.name === args[0])
            if (command){
                embeddedMessage.addField(
                    command.name,
                    `${command.usage}\n${command.description}`
                )
                await message.member?.send(embeddedMessage)
            } else {
                await message.member?.send(`Could not find specified command ${args[0]}`)
            }
        } else {
            commands.forEach((command: Command) => {
                embeddedMessage.addField(
                    command.name,
                    `${command.usage}\n${command.description}`
                )
            })
            await message.member?.send(embeddedMessage)
        }


    }
}

export = command