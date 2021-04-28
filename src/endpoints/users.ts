import express from 'express';
import HttpStatus from 'http-status-codes';
import { SwipedMovie, Movie } from '../movie';
import TmdbApi from '../tmdbApi';
import UserRepository from '../repositories/userRepository';
import SwipedMovieRepository from '../repositories/swipedMovieRepository';
import User from '../user';

const swipedMovieRepository = SwipedMovieRepository.getInstance()
const userRepository = UserRepository.getInstance();
const swipedMovies: Map<string, Map<number, SwipedMovie>> = new Map<string, Map<number, SwipedMovie>>();

const users = express.Router();

users.get('/', (_, res) => {
  res.status(HttpStatus.OK)
    .send(userRepository.getAll());
});

users.post('/', (req, res) => {
  try {
    const user = User.parse(req.body);
    userRepository.add(user);

    res.status(HttpStatus.OK)
      .send(user);
  } catch (e) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
  }
});

users.post('/:userId/movies/swiped', (req, res) => {
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

users.get('/:userId/movies', async (req, res) => {
  res.send(await getNewMovies(req.params['userId']));
});

users.get('/:userId/movies/swiped', (req, res) => {
  const userId = parseInt(req.params['userId']);

  if (userRepository.get(userId)) {
    res.status(HttpStatus.OK)
      .send(swipedMovieRepository.findByUserId(userId));
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

async function getNewMovies(username: string): Promise<Movie[]> {
  if (!swipedMovies.get(username)) {
    swipedMovies.set(username, new Map<number, SwipedMovie>());
  }

  let newMovies: Movie[] = [];
  const moviesKeys = Array.from(TmdbApi.getInstance().movies.keys());
  const swipedMoviesKeys = Array.from(swipedMovies.get(username)!.keys());

  for (const movieId of moviesKeys) {
    if (!swipedMoviesKeys.includes(movieId)) {
      newMovies.push(TmdbApi.getInstance().movies.get(movieId)!);
    }
  }

  if (newMovies.length < 10) {
    await TmdbApi.getInstance().fetchNewMovies();
    newMovies = await getNewMovies(username);
  }

  return newMovies;
}

export default users;
