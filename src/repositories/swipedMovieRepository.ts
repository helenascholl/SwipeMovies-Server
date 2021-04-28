import { SwipedMovie } from '../movie';

export default class SwipedMovieRepository {
  private static instance: SwipedMovieRepository;
  private swipedMovies: Map<number, SwipedMovie>;

  private constructor() {
    this.swipedMovies = new Map<number, SwipedMovie>();
  }

  public static getInstance(): SwipedMovieRepository {
    if (!this.instance) {
      this.instance = new SwipedMovieRepository();
    }

    return this.instance;
  }

  public add(swipedMovie: SwipedMovie): SwipedMovie {
    this.swipedMovies.set(swipedMovie.movie.id, swipedMovie);
    return swipedMovie;
  }

  public findByUserId(userId: number): SwipedMovie[] {
    const swipedMovies: SwipedMovie[] = [];

    for (const swipedMovie of Array.from(this.swipedMovies.values())) {
      if (swipedMovie.user.id === userId) {
        swipedMovies.push(swipedMovie);
      }
    }

    return swipedMovies;
  }
}
