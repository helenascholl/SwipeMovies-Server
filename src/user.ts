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

  public static parse(obj: any): User {
    if (
      obj &&
      (typeof obj.id === 'number' || typeof obj.id === 'undefined') &&
      typeof obj.username === 'string'
    ) {
      return new User(obj.id, obj.username);
    } else {
      throw Error('Cannot parse object to User');
    }
  }

  public addMovie(swipedMovie: SwipedMovie) {
    this.swipedMovies.set(swipedMovie.movie.id, swipedMovie);
  }
}
