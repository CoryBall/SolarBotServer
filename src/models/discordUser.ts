import {Column, Entity} from "typeorm";
import {EntityBase} from "./entityBase";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class DiscordUser extends EntityBase {
    @Field(() => String)
    @Column()
    authToken: string;

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