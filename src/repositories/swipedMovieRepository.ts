import { SwipedMovie } from '../movie';

export default class SwipedMovieRepository {
  private static instance: SwipedMovieRepository;
  private swipedMovies: Map<number, SwipedMovie>;
  private currentId: number;

  private constructor() {
    this.swipedMovies = new Map<number, SwipedMovie>();
    this.currentId = 0;
  }

  public static getInstance(): SwipedMovieRepository {
    if (!this.instance) {
      this.instance = new SwipedMovieRepository();
    }

    return this.instance;
  }

  public add(swipedMovie: SwipedMovie): SwipedMovie {
    swipedMovie.movie.id = this.currentId;
    this.swipedMovies.set(this.currentId++, swipedMovie);

    return swipedMovie;
  }
}
