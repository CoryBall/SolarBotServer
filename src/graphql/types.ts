import {Request} from "express";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}


@ObjectType()
export class DiscordGuild {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    icon: string;

    @Field()
    owner: boolean;
}


export function getAuthToken(req: Request) {
    const rawHeader = req.header('Authorization');

    if(!rawHeader) return null;
    return rawHeader.replace(/Bearer /gi, '');
}

