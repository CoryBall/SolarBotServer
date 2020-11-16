import {Column, PrimaryColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export abstract class NextauthBaseEntity{

    @Field(() => ID)
    @PrimaryColumn("id")
    id: number;

    @Field(() => Date)
    @Column()
    created_at: Date;

    @Field(() => Date)
    @Column()
    updated_at: Date;

}