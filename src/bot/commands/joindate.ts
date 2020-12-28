import {GuildMember, Message} from "discord.js";
import {Command} from "../types";


const command: Command = {
    name: 'joinDate',
    description: 'Gets the date the Guild Member joined the Guild',
    usage: '"!joinDate" or "!joinDate <username>"',
    async execute(message: Message, args: string[] | undefined) {
        let targetUser: GuildMember | undefined = undefined;
        if (args && args.length !== 0){
            let userName = args[0].trim();
            if (userName.startsWith('<@!')) {
                const mentionedUser = message.mentions?.members?.first()
                if (mentionedUser) userName = mentionedUser?.user.username
            }
            const guildUsers = await message.guild?.members.fetch();
            targetUser = guildUsers?.find((user: GuildMember) => {
                return user.user?.username === userName
            })

        } else {
            targetUser = message.member!
        }

        if (!targetUser) {
            await message.reply("Could not find user");
            return;
        }

        const joinedAt = targetUser?.joinedAt;
        if (!joinedAt) {
            await message.reply("Something is up with your data in this guild, I'm not sure when you joined.")
        }
        const timeDifference = (new Date()).getTime() - joinedAt!.getTime();
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        await message.reply(`${args ? targetUser.user.username : 'You'} joined ${dayDifference} days ago, on ${joinedAt!.toLocaleDateString("en-US")}`);
    }
}

export = command