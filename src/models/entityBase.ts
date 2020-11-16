import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export abstract class EntityBase{

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Date)
    @CreateDateColumn()
    created: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    modified: Date;

    @Field(() => Boolean)
    @Column()
    deleted: boolean;
}