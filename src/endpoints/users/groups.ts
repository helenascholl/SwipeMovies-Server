import express from 'express';
import UserRepository from '../../repositories/userRepository';
import HttpStatus from 'http-status-codes';
import UserGroupRepository from '../../repositories/userGroupRepository';

const userRepository = UserRepository.getInstance();
const userGroupRepository = UserGroupRepository.getInstance();

const groups = express.Router();

groups.get('/:userId/groups', (req, res) => {
  const user = userRepository.get(parseInt(req.params['userId']));

  if (user) {
    res.status(HttpStatus.OK)
      .send(userGroupRepository.findGroupsByUserId(user.id));
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

export default groups;
