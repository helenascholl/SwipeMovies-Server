import express from 'express';
import HttpStatus from 'http-status-codes';
import UserRepository from '../../repositories/userRepository';
import User from '../../user';
import movies from './movies';
import swipedMovies from './swipedMovies';

const repository = UserRepository.getInstance();

const users = express.Router();

users.use('/', movies);
users.use('/', swipedMovies);

users.get('/', (_, res) => {
  res.status(HttpStatus.OK)
    .send(repository.getAll());
});

users.post('/', (req, res) => {
  try {
    const user = User.parse(req.body);
    repository.add(user);

    res.status(HttpStatus.OK)
      .send(user);
  } catch (e) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
  }
});

export default users;
