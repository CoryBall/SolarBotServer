import {Column, Entity} from "typeorm";
import {EntityBaseEntity} from "./entityBase.entity";
import {Field} from "type-graphql";


@Entity()
export class FinalFantasyUserEntity extends EntityBaseEntity {

    @Field(() => String)
    @Column()
    lodestoneId: string;
}

