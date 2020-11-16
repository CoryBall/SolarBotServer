import {Column, Entity} from "typeorm";
import {EntityBase} from "./entityBase";
import {Field} from "type-graphql";


@Entity()
export class FinalFantasyUser extends EntityBase {

    @Field(() => String)
    @Column()
    lodestoneId: string;
}

