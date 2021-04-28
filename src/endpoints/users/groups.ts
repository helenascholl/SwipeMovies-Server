import express from 'express';
import HttpStatus from 'http-status-codes';
import UserRepository from '../../repositories/userRepository';
import UserGroupRepository from '../../repositories/userGroupRepository';
import GroupRepository from '../../repositories/groupRepository';

const userRepository = UserRepository.getInstance();
const groupRepository = GroupRepository.getInstance();
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

groups.post('/:userId/groups', (req, res) => {
  const user = userRepository.get(parseInt(req.params['userId']));
  const group = groupRepository.get(parseInt(req.body['id']));

  if (user && group) {
    userGroupRepository.add(user, group);
    res.status(HttpStatus.OK)
      .send(group);
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

export default groups;
