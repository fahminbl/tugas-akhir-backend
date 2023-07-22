/* eslint-disable import/extensions */
import Inventory from '../models/inventory.js';
import { successResp, errorResp } from '../utils/response.js';
import { inventorySchema } from '../validator/inventoryValidator.js';
//import inventorySchema from '../validator/inventoryValidator.js';

export const getInventory = async (req, res, next) => {
  try {
    const [result] = await Inventory.getInventory();
    const msg = 'Sucess';
    successResp(res, msg, result);
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
