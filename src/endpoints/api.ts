import express from 'express';
import users from './users';
import groups from './groups';

const api = express.Router();

api.use('/users', users);
api.use('/groups', groups)

export default api;
