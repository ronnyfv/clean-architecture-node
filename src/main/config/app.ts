import express from 'express';
import { middleware } from './middlewares';

const app = express();

middleware(app);

export { app };
