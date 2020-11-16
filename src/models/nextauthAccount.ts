import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {NextauthBase} from "./nextauthBase";
import {NextauthUser} from "./nextauthUser";

@ObjectType()
@Entity({name:"nextauth_accounts", synchronize: false})
export class NextauthAccount extends NextauthBase {

    @Field(() => ID)
    @Column({name: 'compound_id'})
    compoundId: string;

    @Field(() => ID)
    @Column({name: 'user_id'})
    userId: string;

    @Field(() => NextauthUser)
    @ManyToOne(() => NextauthUser, user => user.accounts)
    @JoinColumn({name: 'user_id'})
    user: NextauthUser;

    @Field(() => String)
    @Column({name: 'provider_type'})
    providerType: string;

    @Field(() => String)
    @Column({name: 'provider_id'})
    providerId: string;

    @Field(() => String)
    @Column({name: 'provider_account_id'})
    providerAccountId: string;

    @Field(() => String)
    @Column({name: 'refresh_token'})
    refreshToken: string;

    @Field(() => String)
    @Column({name: 'access_token'})
    accessToken: string;

    @Field(() => Date)
    @Column({name: 'access_token_expires'})
    accessTokenExpires: Date;

}
