/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import dbPool from '../utils/db.js';

class Inventory {
  static async getInventory(query, params) {
    const sql = query;
    const value = params;
    try {
      return dbPool.query(sql, value);
    } catch (error) {
      console.log(error);
    }
  }

  // static async filterByQuery(query) {
  //   try {
  //     const sql = `select * from inventory where name = '${query.name}'`;
  //     return dbPool.query(sql);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  static async getItem(id) {
    try {
      const sql = `select name, description, quantity, price from inventory where id = ${id}`;
      return dbPool.query(sql);
    } catch (error) {
      console.log(error);
    }
  }

  static async addItem({
    name, description, quantity, price,
  }) {
    try {
      const sql = 'insert into inventory (name, description, quantity, price) values (?, ?, ?, ?)';
      const value = [name, description, quantity, price];
      return dbPool.query(sql, value);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateItem({
    name, description, quantity, price,
  }, id) {
    try {
      const sql = 'UPDATE inventory SET name = ?, description = ?, quantity = ?, price = ? WHERE id = ?';
      const value = [name, description, quantity, price, id];
      return await dbPool.query(sql, value);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteItem(id) {
    try {
      const sql = 'DELETE FROM inventory WHERE id = ?';
      const value = [id];
      return dbPool.query(sql, value);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Inventory;
