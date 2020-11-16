import {Column, Entity, OneToMany} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import {NextauthBase} from "./nextauthBase";
import {NextauthAccount} from "./nextauthAccount";
import {NextauthSession} from "./nextauthSession";

@ObjectType()
@Entity({name:"nextauth_users", synchronize: false})
export class NextauthUser extends NextauthBase {

    @Field(() => String)
    @Column({name: 'name'})
    name: string;

    @Field(() => String)
    @Column({name: 'email'})
    email: string;

    @Field(() => Date)
    @Column({name: 'email_verified'})
    emailVerified: Date;

    @Field(() => String)
    @Column({name: 'image'})
    image: string;

    @Field(() => [NextauthAccount])
    @OneToMany(() => NextauthAccount, account => account.user)
    accounts: NextauthAccount[];

    @Field(() => [NextauthSession])
    @OneToMany(() => NextauthSession, session => session.user)
    sessions: NextauthSession[];

}