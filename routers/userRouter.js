/* eslint-disable import/extensions */
import express from 'express';
import * as userService from '../services/userService.js';

const userRouter = express.Router();

userRouter.post('/login', userService.loginUser);
userRouter.post('/register', userService.registerUser);

export default userRouter;
