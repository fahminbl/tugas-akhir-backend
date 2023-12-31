/* eslint-disable consistent-return */
import dbPool from '../utils/db.js';

class User {
  static async getUser() {
    const sql = 'select * from users';
    try {
      return dbPool.query(sql);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(id) {
    try {
      const sql = `select name, password from users where id = ${id}`;
      return dbPool.query(sql);
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(query, data) {
    try {
      const sql = query;
      const value = data;
      return dbPool.query(sql, value);
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(query, data) {
    try {
      const sql = query;
      const value = data;
      return dbPool.query(sql, value);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(id, { username, password }) {
    try {
      const sql = `update users set name = ${username}, set password = ${password} where id = ${id}`;
      return dbPool.query(sql);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(id) {
    try {
      const sql = `delete from task where id = ${id}`;
      return dbPool.query(sql);
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
