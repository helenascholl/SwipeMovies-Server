import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import api from './endpoints/api';
import status from './endpoints/status';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api', api);
app.use('/status', status);

app.listen(80, () => console.log('Listening on port 80'));
