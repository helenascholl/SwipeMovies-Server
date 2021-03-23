import express from 'express';

const app = express();

app.get('/status', (req, res) => {
  res.send('Server is running!');
});

app.listen(80, () => console.log('Listening on port 80'));
