import express from 'express';
import api from './api';

const app = express();
const port = 3000;

const client = api();

app.get('/', async (_, res) => {
    const data = await client.getData();
    res.send(data);
});

app.listen(port, () => {
    console.log(`Listening :${port}`);
});
