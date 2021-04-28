import express from 'express';
import GroupRepository from '../repositories/groupRepository';
import HttpStatus from 'http-status-codes';
import Group from '../group';

const groupRepository = GroupRepository.getInstance();

const groups = express.Router();

groups.get('/', (_, res) => {
  res.status(HttpStatus.OK)
    .send(groupRepository.getAll());
});

groups.post('/', (req, res) => {
  try {
    const group = Group.parse(req.body);
    groupRepository.add(group);

    res.status(HttpStatus.OK)
      .send(group);
  } catch (e) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
  }
});

export default groups;
