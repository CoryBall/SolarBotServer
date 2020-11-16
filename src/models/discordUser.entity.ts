import {Column, Entity} from "typeorm";
import {EntityBaseEntity} from "./entityBase.entity";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class DiscordUserEntity extends EntityBaseEntity {
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