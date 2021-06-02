import {Column, Entity} from "typeorm";
import {EntityBase} from "./entityBase";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class DiscordUser extends EntityBase {
    @Field(() => String)
    @Column()
    authToken: string | null;

    @Field(() => String)
    @Column()
    discordId: string;

    @Field(() => String)
    @Column()
    lodestoneId: string | null;

    @Column()
    isConfirmed: boolean;

    @Column()
    lodestoneHash: string;

    @Field(() => String)
    @Column()
    username: string;

    @Field(() => String)
    @Column()
    discriminator: string;

    @Field(() => String)
    @Column()
    avatarUrl: string;
}