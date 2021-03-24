import express from 'express';

const status = express();

status.get('/', (_, res) => {
  res.send('Server is running!');
});

export default status;
