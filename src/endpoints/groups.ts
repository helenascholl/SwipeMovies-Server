import express from 'express';
import GroupRepository from '../repositories/groupRepository';
import HttpStatus from 'http-status-codes';

const groupRepository = GroupRepository.getInstance();

const groups = express.Router();

groups.get('/', (_, res) => {
  res.status(HttpStatus.OK)
    .send(groupRepository.getAll());
});

export default groups;
