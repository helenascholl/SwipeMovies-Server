import { SwipedMovie } from '../movie';

export default class SwipedMovieRepository {
  private static instance: SwipedMovieRepository;
  private swipedMovies: Map<number, Map<number, SwipedMovie>>

  private constructor() {
    this.swipedMovies = new Map<number, Map<number, SwipedMovie>>();
  }

  public static getInstance(): SwipedMovieRepository {
    if (!this.instance) {
      this.instance = new SwipedMovieRepository();
    }

    return this.instance;
  }

  public add(swipedMovie: SwipedMovie): SwipedMovie {
    if (!this.swipedMovies.get(swipedMovie.user.id)) {
      this.swipedMovies.set(swipedMovie.user.id, new Map<number, SwipedMovie>());
    }

    this.swipedMovies.get(swipedMovie.user.id)!.set(swipedMovie.movie.id, swipedMovie);

    return swipedMovie;
  }

  public findByUserId(userId: number): SwipedMovie[] {
    const swipedMovies: SwipedMovie[] = [];

    if (this.swipedMovies.get(userId)) {
      swipedMovies.push(... Array.from(this.swipedMovies.get(userId)!.values()));
    }

    return swipedMovies;
  }
}
