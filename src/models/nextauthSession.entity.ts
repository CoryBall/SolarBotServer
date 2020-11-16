import {Column, Entity} from "typeorm";
import {Field, ID} from "type-graphql";
import {NextauthBaseEntity} from "./nextauthBase.entity";

@Entity({name:"nextauth_sessions", synchronize: false})
export class NextauthSessionEntity extends NextauthBaseEntity {

    @Field(() => ID)
    @Column({name: 'user_id'})
    userId: number;

    @Field(() => Date)
    @Column({name: 'expires'})
    expires: Date;

    @Field(() => String)
    @Column({name: 'session_token'})
    sessionToken: string;

    @Field(() => String)
    @Column({name: 'access_token'})
    accessToken: string;

}