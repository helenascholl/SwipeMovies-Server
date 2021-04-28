import { SwipedMovie } from './movie';

export default class User {
  public id: number;
  public username: string;
  private swipedMovies: Map<number, SwipedMovie>;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
    this.swipedMovies = new Map<number, SwipedMovie>();
  }

  public addMovie(swipedMovie: SwipedMovie) {
    this.swipedMovies.set(swipedMovie.movie.id, swipedMovie);
  }
}
