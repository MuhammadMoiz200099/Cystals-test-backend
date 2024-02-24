import express, { Application } from 'express';
import path from 'path';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import l from './logger';
const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Credentials'
};

export default class ExpressServer {
    private routes: (app: Application) => void;
    constructor() {
        const root = path.normalize(__dirname + '/../..');
        app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(
            express.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb',
            })
        );
        app.use(express.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(cookieParser('', {
            maxAge: 60 * 60 * 24 * 14 * 1000,
            httpOnly: true
        }));
        app.use(express.static(`${root}/server/dist`));
        app.use(cors(corsOptions));
    }

    router(routes: (app: Application) => void): ExpressServer {
        this.routes = routes;
        return this;
    }

    listen(port: number): Application {
        const welcome = (p: number) => (): void =>
            l.info(
                `up and running in ${'production'
                } @: ${os.hostname()} on port: ${p}}`
            );
        this.routes(app);
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}