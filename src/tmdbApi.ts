import got from 'got';
import { Movie } from './movie';

export default class TmdbApi {
  private static instance: TmdbApi;
  public movies: Map<number, Movie>;
  private currentPage: number;
  private posterBaseUrl = 'https://image.tmdb.org/t/p/w200';

  private constructor() {
    this.movies = new Map<number, Movie>();
    this.currentPage = 1;
  }

  public static getInstance(): TmdbApi {
    if (!this.instance) {
      this.instance = new TmdbApi();
    }

    return this.instance;
  }

  public fetchNewMovies(): Promise<Map<number, Movie>> {
    return new Promise<Map<number, Movie>>((resolve, reject) => {
      got.get(this.getTMDbAPIUrl(this.currentPage++))
        .then(res => {
          const fetchedMovies = JSON.parse(res.body).results;

          for (const movie of fetchedMovies) {
            this.movies.set(movie.id, {
              id: movie.id,
              title: movie.title,
              description: movie.overview,
              posterUrl: this.posterBaseUrl + movie.poster_path
            });
          }

          resolve(this.movies);
        })
        .catch(reject);
    });
  }

  private getTMDbAPIUrl(page: number): string {
    if (!process.env['TMDB_API_KEY']) {
      throw new Error('Environment variable TMDB_API_KEY not set');
    }

    return `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env['TMDB_API_KEY']}&page=${page}`;
  }
}
