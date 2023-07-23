/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import Inventory from '../models/inventory.js';
import { successResp, errorResp } from '../utils/response.js';
import { inventorySchema } from '../validator/inventoryValidator.js';

export const getInventory = async (req, res, next) => {
  const { name, price, sort } = req.query;
  const defaultQuery = 'select * from inventory';
  let queryParams = [];
  let query;
  if (typeof name === 'undefined' && typeof query === 'undefined' && typeof sort === 'undefined') {
    query = defaultQuery;
  } else if (typeof name !== 'undefined') {
    query = `${defaultQuery} where name = ?`;
    queryParams.push(name);
  // eslint-disable-next-line no-constant-condition
  } else if (typeof { name, price } !== 'undefined') {
    query = `${defaultQuery} where name = ?, price = ?`;
    queryParams.push(name);
    queryParams.push(price);
  } 
  
  if (sort && (sort === 'asc' || sort === 'desc')) {
    query = `${defaultQuery} ORDER BY price ${sort.toUpperCase()}`;
    queryParams = [];
  }

  try {
    const [result] = await Inventory.getInventory(query, queryParams);
    const msg = 'Success';
    if (Object.keys(result).length === 0) {
      errorResp(res, 'Data tidak ditemukan', 404);
    } else {
      successResp(res, msg, result);
    }
    queryParams = [];
    query = defaultQuery;
  } catch (error) {
    next(error);
  }
};

export const addItemToInventory = async (req, res, next) => {
  try {
    const value = await inventorySchema.validateAsync(req.body);
    const [response] = await Inventory.addItem(value);

    successResp(res, 'Success menambahkan item', response, 201);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const value = await inventorySchema.validateAsync(req.body);
    const [response] = await Inventory.updateItem(value, req.params.id);
    if (response.affectedRows !== 0) {
      successResp(res, `sukses mengedit item dengan id ${req.params.id}`, response, 201);
    } else {
      errorResp(res, `Tidak dapat mengubah data dengan id: ${req.params.id}, id tidak ditemukan`, 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const [response] = await Inventory.deleteItem(req.params.id);
    if (response.affectedRows !== 0) {
      successResp(res, `sukses menghapus item dengan id ${req.params.id}`, response, 201);
    } else {
      errorResp(res, `Tidak dapat menghapus data dengan id: ${req.params.id}, id tidak ditemukan`, 404);
    }
  } catch (error) {
    next(error);
  }
};

// export const filterInventory = async (req, res, next) => {
//   try {
//     console.log(req.query);
//     const [response] = await Inventory.filterByQuery(req.query);
//     successResp(res, 'Sukses mendapatkan data', response, 201);
//   } catch (error) {
//     next(next);
//   }
// }
