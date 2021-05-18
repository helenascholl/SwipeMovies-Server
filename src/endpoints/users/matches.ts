import express from 'express';
import UserRepository from '../../repositories/userRepository';
import UserGroupRepository from '../../repositories/userGroupRepository';
import User from '../../user';
import HttpStatus from 'http-status-codes';
import SwipedMovieRepository from '../../repositories/swipedMovieRepository';
import { Match, SwipeDirection } from '../../movie';

const matches = express.Router();

const userRepository = UserRepository.getInstance();
const userGroupRepository = UserGroupRepository.getInstance();
const swipedMovieRepository = SwipedMovieRepository.getInstance();

matches.get('/:userId/matches', async (req, res) => {
  if (req.params['userId']) {
    const user = userRepository.get(parseInt(req.params['userId']));
    const matches: Match[] = [];

    if (user) {
      const groups = userGroupRepository.findGroupsByUserId(user.id);
      const swipedMovies = swipedMovieRepository.findByUserId(user.id)
      const users: User[] = [];

      for (const group of groups) {
        for (const groupUser of userGroupRepository.findUsersByGroupId(group.id)) {
          if (groupUser.id !== user.id) {
            let userExists = false;

            for (const userInArray of users) {
              if (groupUser.id === userInArray.id) {
                userExists = true;
              }
            }

            if (!userExists) {
              users.push(groupUser);
            }
          }
        }
      }

      for (const groupUser of users) {
        for (const groupUserSwipedMovie of swipedMovieRepository.findByUserId(groupUser.id)) {
          for (const swipedMovie of swipedMovies) {
            if (
              groupUserSwipedMovie.movie.id === swipedMovie.movie.id
              && groupUserSwipedMovie.swipeDirection === SwipeDirection.RIGHT
              && swipedMovie.swipeDirection === SwipeDirection.RIGHT
            ) {
              matches.push({
                movie: swipedMovie.movie,
                user: groupUser
              });
            }
          }
        }
      }

      res.status(HttpStatus.OK)
        .send(matches);
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
});

export default matches;
