import "reflect-metadata"
import express, {Request, Response} from "express";
import {buildSchema} from "type-graphql";
import {UserResolver} from "../graphql/resolvers/userResolver";
import {Connection} from "typeorm";
import {ApolloServer} from "apollo-server-express";

export default async ({ app, orm }: {app: express.Application, orm: Connection}) =>{
    let em = orm.manager;

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: true
        }),
        context: ({ req, res }: {req : Request, res: Response}) => ({ em: em, req, res})
    });

    server.applyMiddleware({app});

    return server;
};