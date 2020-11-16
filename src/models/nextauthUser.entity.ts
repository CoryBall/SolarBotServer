import {Column, Entity} from "typeorm";
import {Field} from "type-graphql";
import {NextauthBaseEntity} from "./nextauthBase.entity";

@Entity({name:"nextauth_users", synchronize: false})
export class NextauthUserEntity extends NextauthBaseEntity {

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

}