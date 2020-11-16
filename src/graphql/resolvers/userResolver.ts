import {Arg, Ctx, Query, Resolver} from "type-graphql";
import {DiscordGuild, getAuthToken} from "../types";
import {Request} from 'express';
import {DiscordAPI, PartialGuildResponse} from '../../discordAPI';
import {NextauthSession} from "../../models/nextauthSession";
import {NextauthUser} from "../../models/nextauthUser";
import {getRepository} from "typeorm";
//
// @InputType()
// class NewUserInput{
//     @Field()
//     auth0Token: string;
//     @Field()
//     username: string;
//     @Field()
//     discriminator: string;
//     @Field()
//     avatarUrl: string;
// }
//
// @ObjectType()
// class UserResponse {
//     @Field(() => [FieldError], {nullable: true})
//     error?: FieldError[]
//
//     @Field(() => DiscordUser, {nullable: true})
//     user?: DiscordUser
// }

@Resolver()
export class UserResolver {

    @Query(() => NextauthUser, {nullable: true})
    async me(
        @Arg("sessionToken") accessToken : string
    ) : Promise<NextauthUser | undefined> {
        const sessionRepository = getRepository(NextauthSession);
        const userRepository = getRepository(NextauthUser);

        const session = await sessionRepository.findOne({where: [{accessToken : accessToken}]});

        const user = await userRepository.findOne(session?.userId, {relations: ["accounts", "sessions"]});

        return user;
    }

    @Query(() => [DiscordGuild], {nullable: true})
    async guilds(
        @Ctx() req : Request
    ) {
        const token = getAuthToken(req);

        if (!token) return null;

        const discord = new DiscordAPI(token);
        let partialGuilds : PartialGuildResponse[] = await discord.getPartialGuilds();
        let guilds : DiscordGuild[] = [];

        for(let i = 0; i < partialGuilds.length; i++){
            guilds.push({
                id: partialGuilds[i].id,
                name: partialGuilds[i].name,
                icon: `cdn.discordapp.com/icons/${partialGuilds[i].id}/${partialGuilds[i].icon}.png`,
                owner: partialGuilds[i].owner
            })
        }

        return guilds;
    }

    // @Query(() => DiscordUser, {nullable: true})
    // async guildMembers(
    //     @Arg("guildId") guildId: string,
    //     @Ctx() {req, em} : DataContext
    // ) {
    //
    // }

}