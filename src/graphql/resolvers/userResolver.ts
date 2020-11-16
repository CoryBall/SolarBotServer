import {Ctx, Query, Resolver} from "type-graphql";
import {DiscordGuild, getAuthToken} from "../types";
import {DiscordUserEntity} from "../../models/discordUser.entity";
import {DataContext} from "../../types";
import {DiscordAPI, PartialGuildResponse} from '../../discordAPI';
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
//     @Field(() => DiscordUserEntity, {nullable: true})
//     user?: DiscordUserEntity
// }

@Resolver()
export class UserResolver {

    @Query(() => DiscordUserEntity, {nullable: true})
    async me(
        @Ctx(){ req , em } : DataContext
    ) {
        const token = getAuthToken(req);

        const user = await em.findOne(DiscordUserEntity, {where: [{authToken : token}] });

        if (!user) return null;
        return user;
    }

    @Query(() => [DiscordGuild], {nullable: true})
    async guilds(
        @Ctx() {req} : DataContext
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

    // @Query(() => DiscordUserEntity, {nullable: true})
    // async guildMembers(
    //     @Arg("guildId") guildId: string,
    //     @Ctx() {req, em} : DataContext
    // ) {
    //
    // }

}