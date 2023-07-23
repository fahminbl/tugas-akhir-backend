/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import User from '../models/user.js';
import { successResp, errorResp } from '../utils/response.js';
import { userSchema } from '../validator/userValidator.js';
import hashUserPassword from '../utils/hashPassword.js';

const { JWT_SECRET_KEY } = process.env;
// eslint-disable-next-line import/prefer-default-export
export const registerUser = async (req, res, next) => {
  try {
    const userCredential = await userSchema.validateAsync(req.body);
    const hashedPassword = await hashUserPassword(userCredential.password);
    const query = 'insert into users (username, email, password) values (?, ?, ?)';
    const values = [userCredential.username, userCredential.email, hashedPassword];
    const [response] = await User.createUser(query, values);
    successResp(res, 'Registrasi Berhasil', response, 201);
  } catch (error) {
    errorResp(res, 'Error saat registrasi', 500);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const userCredential = await userSchema.validateAsync(req.body);
    const query = 'select * from users where username = ?';
    const value = [userCredential.username];
    const [response] = await User.loginUser(query, value);
    const isPasswordValid = await bcrypt.compare(userCredential.password, response[0].password);
    if (isPasswordValid) {
      successResp(res, 'Autentikasi sukses', isPasswordValid, 201);
    } else {
      errorResp(res, 'username atau password salah', 401);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
