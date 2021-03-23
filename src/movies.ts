import express from 'express';
import HttpStatus from 'http-status-codes';
import { SwipedMovie, isSwipedMovie } from './movie';

const swipedMovies: Map<string, Map<number, SwipedMovie>> = new Map<string, Map<number, SwipedMovie>>();

const movies = express();

movies.post('/user/:userId', (req, res) => {
  const userId = req.params['userId'];

  if (isSwipedMovie(req.body)) {
    const swipedMovie: SwipedMovie = req.body;

    if (!swipedMovies.get(userId)) {
      swipedMovies.set(userId, new Map<number, SwipedMovie>());
    }

    swipedMovies.get(userId)!.set(swipedMovie.movie.id, swipedMovie);
    res.status(HttpStatus.OK)
      .send(JSON.stringify(swipedMovie));
  } else {
    res.sendStatus(HttpStatus.BAD_REQUEST);
  }
});

export default movies;
