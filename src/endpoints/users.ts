import express from 'express';
import HttpStatus from 'http-status-codes';
import { SwipedMovie, isSwipedMovie, Movie } from '../movie';
import TmdbApi from '../tmdbApi';

const swipedMovies: Map<string, Map<number, SwipedMovie>> = new Map<string, Map<number, SwipedMovie>>();

const users = express();

users.post('/:userId/movies', (req, res) => {
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

users.get('/:userId/movies', (req, res) => {
  const userMovies = swipedMovies.get(req.params['userId']);

  if (userMovies) {
    res.status(HttpStatus.OK)
      .send(JSON.stringify(Array.from(userMovies.values())));
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

export default users;

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
