import { Request } from 'express'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class DiscordGuild {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field(() => String, { nullable: true })
    icon: string | null;

    @Field()
    owner: boolean;
}

@ObjectType()
export class DiscordUser {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    discriminator: string;

    @Field()
    icon: string;
}

@ObjectType()
export class DiscordGuildRole {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    color: number;

    @Field()
    hoist: boolean;

    @Field()
    position: number;
}

@ObjectType()
export class DiscordGuildMember {
    @Field()
    user: DiscordUser;

    @Field()
    nickname: string;

    @Field(() => [DiscordGuildRole])
    roles: DiscordGuildRole[];

    @Field()
    joinedAt: Date;
}

export function getAuthToken (req: Request) {
  return req?.headers?.authorization?.split('Bearer ')[1]
}
