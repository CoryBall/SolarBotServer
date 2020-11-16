import {Column, Entity} from "typeorm";
import {Field, ID} from "type-graphql";
import {NextauthBaseEntity} from "./nextauthBase.entity";

@Entity({name:"nextauth_accounts", synchronize: false})
export class NextauthAccountEntity extends NextauthBaseEntity {

    @Field(() => ID)
    @Column({name: 'compound_id'})
    compoundId: string;

    @Field(() => ID)
    @Column({name: 'user_id'})
    userId: string;

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
