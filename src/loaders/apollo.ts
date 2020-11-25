import 'reflect-metadata'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '../graphql/resolvers/userResolver'
import { ApolloServer } from 'apollo-server-express'
import { GuildResolver } from '../graphql/resolvers/guildResolver'

export default async ({ app }: {app: express.Application}) => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, GuildResolver],
      validate: true
    }),
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({ req, res })
  })

  server.applyMiddleware({
    app,
    cors: false
  })

  return server
}
