import User from './user';

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

export class SwipedMovie {
  public movie: Movie;
  public swipeDirection: SwipeDirection;
  public user: User;

  constructor(id: number, title: string, description: string, posterUrl: string,
    swipeDirection: SwipeDirection, user: User) {
    this.movie = {
      id: id,
      title: title,
      description: description,
      posterUrl: posterUrl
    };
    this.swipeDirection = swipeDirection;
    this.user = user;
  }

  public static parse(obj: any, user: User): SwipedMovie {
    if (
      obj &&
      obj.movie &&
      typeof obj.movie.id === 'number' &&
      typeof obj.movie.title === 'string' &&
      typeof obj.movie.description === 'string' &&
      typeof obj.movie.posterUrl === 'string' &&
      (obj.swipeDirection === SwipeDirection.LEFT || obj.swipeDirection === SwipeDirection.RIGHT)
    ) {
      return new SwipedMovie(obj.movie.id,obj.movie.title,
        obj.movie.description, obj.movie.posterUrl, obj.swipeDirection, user);
    } else {
      throw Error('Cannot parse object to SwipedMovie');
    }
  }
}

export interface Match {
  movie: Movie,
  users: User[]
}
