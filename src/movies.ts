import express from 'express';

const movies = express();

movies.get('/', ((req, res) => res.send('movies')));

export default movies;
