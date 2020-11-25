import { Arg, Query, Resolver } from 'type-graphql'
import { NextauthSession } from '../../models/nextauthSession'
import { NextauthUser } from '../../models/nextauthUser'
import { getRepository } from 'typeorm'

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
    @Query(() => NextauthUser, { nullable: true })
  async me (
        @Arg('sessionToken') accessToken : string
  ) : Promise<NextauthUser | undefined> {
    console.log(accessToken)
    const sessionRepository = getRepository(NextauthSession)
    const userRepository = getRepository(NextauthUser)

    const session = await sessionRepository.findOne({ where: [{ accessToken: accessToken }] })

    const user = await userRepository.findOne(session?.userId, { relations: ['accounts', 'sessions'] })

    return user
  }

  // @Query(() => DiscordUser, {nullable: true})
  // async guildMembers(
  //     @Arg("guildId") guildId: string,
  //     @Ctx() {req, em} : DataContext
  // ) {
  //
  // }
}
