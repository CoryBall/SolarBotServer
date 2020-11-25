import 'reflect-metadata'
import expressLoader from './express'
import apolloLoader from './apollo'
import typeormLoader from './typeorm'
import discordLoader from './discordClient'
import express from 'express'

export default async ({ expressApp } : {expressApp : express.Application}) => {
  await typeormLoader()
  console.log('TypeORM Initialized')
  await expressLoader({ app: expressApp })
  console.log('Express Initialized')
  await apolloLoader({ app: expressApp })
  console.log('Apollo Server Initialized')
  await discordLoader()
  console.log('Loaders complete')
}
