# SolarBot Server

## Purpose of this project

The purpose of SolarBot is to provide a connection between Discord and Final Fantasy 14's data. <br/>
This allows discord users to connect with FFXIV's API and allow managing FC members in the discord server.

### Features

### In Progress:
+ !dateJoined "discord name" (In Progress)
  + returns the date that user joined the FC, and how many days it has been since then
+ !fights
  + returns a list of fights registered in the server
+ !cleared "fight name"
  + returns a list of discord users in the server that have completed this fight
+ !needsClear "fight name"
  + returns a list of discord users that have requested help for the specified fight

### Steps to run this project:

+ Create a .env file with the following variables:
  + DATABASE_USERNAME
  + DATABASE_PASSWORD
  + DATABASE_NAME
  + TYPEORM_CONNECTION = postgres
  + TYPEORM_HOST = localhost
  + TYPEORM_USERNAME
  + TYPEORM_PASSWORD
  + TYPEORM_DATABASE
  + TYPEORM_PORT
  + TYPEORM_SYNCHRONIZE
  + TYPEORM_LOGGING
  + TYPEORM_ENTITIES = dist/models/*{.ts,.js}
  + TYPEORM_MIGRATIONS = src/migrations/*{.ts,.js}
  + DISCORD_BOT_TOKEN
+ ``yarn`` to install all dependencies
+ ``yarn dev`` That's it!

### Tech Stack

+ Node.js
+ Typescript
+ PostgreSQL
+ TypeORM
+ TypeGraphQL
+ Apollo Server
