import express from 'express';
import dotenv from 'dotenv';
import appMiddleware from './middlewares/index.js';

dotenv.config();

export const app = express();
const portDefault = 3600;
const port = process.env.PORT || portDefault;


app.use(appMiddleware);


app.listen(port, () => {
    console.info(`Server is running on port http://localhost:${port}`);
});
