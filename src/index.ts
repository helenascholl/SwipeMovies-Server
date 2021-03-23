import express from 'express';
import bodyParser from 'body-parser';
import movies from './movies';

const app = express();

app.use(bodyParser.json());
app.use('/movies', movies);

app.get('/status', (req, res) => {
  res.send('Server is running!');
});

app.listen(80, () => console.log('Listening on port 80'));
