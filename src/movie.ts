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
