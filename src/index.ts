import loaders from './loaders';
import express from 'express';

async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server listening on http://localhost:4000/graphql`)
    );
}

startServer();