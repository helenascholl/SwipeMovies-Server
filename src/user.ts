import { SwipedMovie } from './movie';
import SwipedMovieRepository from './repositories/swipedMovieRepository';

export default class User {
  public id: number;
  public username: string;
  private swipedMovieRepository: SwipedMovieRepository;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
    this.swipedMovieRepository = SwipedMovieRepository.getInstance();
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

  public addMovie(swipedMovie: SwipedMovie): SwipedMovie {
    return this.swipedMovieRepository.add(swipedMovie);
  }
}
