import {Column, Entity} from "typeorm";
import {Field} from "type-graphql";
import {NextauthBase} from "./nextauthBase";

@Entity({name:"nextauth_verification_requests", synchronize: false})
export class NextauthVerificationRequest extends NextauthBase {

    @Field(() => String)
    @Column({name: 'identifier'})
    identifier: string;

    @Field(() => String)
    @Column({name: 'token'})
    token: string;

    @Field(() => Date)
    @Column({name: 'expires'})
    expires: Date;


}