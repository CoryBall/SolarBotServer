import loaders from './loaders';
import express from 'express';

async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen({ port: process.env.NODE_PORT }, () =>
        console.log(`Server listening on http://${process.env.NODE_HOST}:${process.env.NODE_PORT}/graphql`)
    );
}

startServer();