import express from 'express';
import HttpStatus from 'http-status-codes';
import GroupRepository from '../repositories/groupRepository';
import UserRepository from '../repositories/userRepository';
import UserGroupRepository from '../repositories/userGroupRepository';
import Group from '../group';

const userRepository = UserRepository.getInstance();
const groupRepository = GroupRepository.getInstance();
const userGroupRepository = UserGroupRepository.getInstance();

const groups = express.Router();

groups.get('/', (_, res) => {
  res.status(HttpStatus.OK)
    .send(groupRepository.getAll());
});

groups.post('/', (req, res) => {
  if (req.body['user'] !== undefined && req.body.user['id'] !== undefined) {
    const user = userRepository.get(parseInt(req.body.user['id']));

    if (user) {
      try {
        const group = Group.parse(req.body.group);

        groupRepository.add(group);
        userGroupRepository.add(user, group);

        res.status(HttpStatus.OK)
          .send(group);
      } catch (e) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
      }
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  } else {
    res.sendStatus(HttpStatus.BAD_REQUEST);
  }
});

export default groups;
