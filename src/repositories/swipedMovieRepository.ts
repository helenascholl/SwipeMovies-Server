export default class SwipedMovieRepository {
  private static instance: SwipedMovieRepository;

  private constructor() {}

  public static getInstance(): SwipedMovieRepository {
    if (!this.instance) {
      this.instance = new SwipedMovieRepository();
    }

    return this.instance;
  }
}
