import {Column, PrimaryColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export abstract class NextauthBase{

    @Field(() => ID)
    @PrimaryColumn({name: "id", type: "int"})
    id: number;

    @Field(() => Date)
    @Column()
    created_at: Date;

    @Field(() => Date)
    @Column()
    updated_at: Date;

}