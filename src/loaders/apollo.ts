import "reflect-metadata"
import express, {Request} from "express";
import {buildSchema} from "type-graphql";
import {UserResolver} from "../graphql/resolvers/userResolver";
import {ApolloServer} from "apollo-server-express";

export default async ({ app }: {app: express.Application}) =>{

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: true
        }),
        context: (req: Request) => (req)
    });

    server.applyMiddleware({app});

    return server;
};