import express from 'express';
import cors from 'cors';

export default async ({ app }: {app: express.Application}) => {

    app.use(express.json());
    app.use(cors());


    return app;
}