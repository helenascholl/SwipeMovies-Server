import express from 'express';
import HttpStatus from 'http-status-codes';
import UserRepository from '../../repositories/userRepository';
import User from '../../user';
import { Movie } from '../../movie';
import TmdbApi from '../../tmdbApi';
import SwipedMovieRepository from '../../repositories/swipedMovieRepository';

const userRepository = UserRepository.getInstance();
const swipedMovieRepository = SwipedMovieRepository.getInstance();

const movies = express.Router();

movies.get('/:userId/movies', async (req, res) => {
  const user = userRepository.get(parseInt(req.params['userId']));

  if (user) {
    res.send(await getNewMovies(user));
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

async function getNewMovies(user: User): Promise<Movie[]> {
  let newMovies: Movie[] = [];
  const moviesIds = Array.from(TmdbApi.getInstance().movies.keys());
  const swipedMoviesIds = swipedMovieRepository.findByUserId(user.id).map(m => m.movie.id);

  for (const movieId of moviesIds) {
    if (!swipedMoviesIds.includes(movieId)) {
      newMovies.push(TmdbApi.getInstance().movies.get(movieId)!);
    }
  }

  if (newMovies.length < 10) {
    await TmdbApi.getInstance().fetchNewMovies();
    newMovies = await getNewMovies(user);
  }

  return newMovies;
}

export default movies;
