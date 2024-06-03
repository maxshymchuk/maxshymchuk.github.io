import express from 'express';
import { config } from 'dotenv';
import { Checker } from './classes/Checker';
import { serve } from './modules/serve';
import { readFile } from 'fs/promises';
import { logger } from './classes/Logger';
import { stringify } from './utils';

config({ override: true });

const app = express();

const port = 3000

app.get('/', async (req, res) => {
    let result: Nullable<string> = null;
    try {
        const buffer = await readFile(Checker.path);
        result = buffer.toString();
    } catch (error) {
        logger().log(`${error}`).newLine();
    } finally {
        const checker = new Checker(result ? JSON.parse(result) as Data : null);
        const content = await serve(checker);
        res.set('Content-Type', 'application/json');
        if (content) {
            res.status(200).send(stringify(content.data));
        } else {
            res.status(404).send('Data not found');
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});