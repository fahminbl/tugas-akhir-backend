import 'dotenv/config';
import pkg from 'jsonwebtoken';
import { errorResp } from './response.js';

const { JWT_SECRET_KEY } = process.env;
const { Jwt } = pkg;

const authJwt = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    errorResp(res, 'Tidak terotorisasi', 401);
  }

  // eslint-disable-next-line consistent-return
  Jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return errorResp(res, 'Token salah', 403);
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};

export default authJwt;
