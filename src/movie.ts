export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
}

export enum SwipeDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface SwipedMovie {
  movie: Movie;
  swipeDirection: SwipeDirection;
}

export function isSwipedMovie(obj: any): obj is SwipedMovie {
  return obj.movie &&
    typeof obj.movie.id === 'number' &&
    typeof obj.movie.title === 'string' &&
    typeof obj.movie.description === 'string' &&
    typeof obj.movie.posterUrl === 'string' &&
    (obj.swipeDirection === SwipeDirection.LEFT || obj.swipeDirection === SwipeDirection.RIGHT);
}
