import express from 'express';
import HttpStatus from 'http-status-codes';
import { SwipedMovie } from '../../movie';
import UserRepository from '../../repositories/userRepository';
import SwipedMovieRepository from '../../repositories/swipedMovieRepository';

const userRepository = UserRepository.getInstance();
const swipedMovieRepository = SwipedMovieRepository.getInstance();

const swipedMovies = express.Router();

swipedMovies.get('/:userId/movies/swiped', (req, res) => {
  const userId = parseInt(req.params['userId']);

  if (userRepository.get(userId)) {
    res.status(HttpStatus.OK)
      .send(swipedMovieRepository.findByUserId(userId));
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

swipedMovies.post('/:userId/movies/swiped', (req, res) => {
  const user = userRepository.get(parseInt(req.params['userId']));

  if (user) {
    try {
      const swipedMovie = SwipedMovie.parse(req.body, user);
      swipedMovieRepository.add(swipedMovie);

      res.status(HttpStatus.OK)
        .send(swipedMovie);
    } catch (e) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

export default swipedMovies;
