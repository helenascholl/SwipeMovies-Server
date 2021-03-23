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
