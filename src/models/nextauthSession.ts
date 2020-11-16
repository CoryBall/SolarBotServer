import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {NextauthBase} from "./nextauthBase";
import {NextauthUser} from "./nextauthUser";

@ObjectType()
@Entity({name:"nextauth_sessions", synchronize: false})
export class NextauthSession extends NextauthBase {

    @Field(() => ID)
    @Column({name: 'user_id'})
    userId: number;

    @Field(() => NextauthUser)
    @ManyToOne(() => NextauthUser, user => user.sessions)
    @JoinColumn({name: 'user_id'})
    user: NextauthUser;

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