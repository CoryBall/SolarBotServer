import {Message} from "discord.js";
import {Command} from "../types";


const command: Command = {
    name: 'dateJoined',
    description: 'Gets the date the Guild Member joined the Guild',
    async execute(message: Message) {
        const joinedAt = message.member?.joinedAt;
        if (!joinedAt) {
            await message.reply("Something is up with your data in this guild, I'm not sure when you joined.")
        }
        const timeDifference = (new Date()).getTime() - joinedAt!.getTime();
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        await message.reply(` You joined ${dayDifference} days ago, on ${joinedAt!.toLocaleDateString("en-US")}`);
    }
}

export = command