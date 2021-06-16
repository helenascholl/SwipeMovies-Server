import { SwipedMovie } from '../movie';
import fs from 'fs';

export default class SwipedMovieRepository {
  private static instance: SwipedMovieRepository;
  private swipedMovies: Map<number, Map<number, SwipedMovie>>

  private constructor() {
    this.swipedMovies = this.parseJsonFile();
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

    this.writeToFile();

    return swipedMovie;
  }

  public findByUserId(userId: number): SwipedMovie[] {
    const swipedMovies: SwipedMovie[] = [];

    if (this.swipedMovies.get(userId)) {
      swipedMovies.push(... Array.from(this.swipedMovies.get(userId)!.values()));
    }

    return swipedMovies;
  }

  private parseJsonFile(): Map<number, Map<number, SwipedMovie>> {
    const data = fs.readFileSync('src/data/swipedMovies.json', { encoding: 'utf-8' });

    const swipedMoviesJson = JSON.parse(data) as { user: number, swipedMovies: SwipedMovie[] }[];
    const map = new Map<number, Map<number, SwipedMovie>>();

    for (const element of swipedMoviesJson) {
      const swipedMovieMap = new Map<number, SwipedMovie>();

      for (const swipedMovie of element.swipedMovies) {
        swipedMovieMap.set(swipedMovie.movie.id, swipedMovie);
      }

      map.set(element.user, swipedMovieMap);
    }

    return map;
  }

  private writeToFile(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data: { user: number, swipedMovies: SwipedMovie[] }[] = [];

      for (const userId of Array.from(this.swipedMovies.keys())) {
        data.push({ user: userId, swipedMovies: Array.from(this.swipedMovies.get(userId)!.values()) });
      }

      fs.writeFile('src/data/swipedMovies.json', JSON.stringify(data, null, 2), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
