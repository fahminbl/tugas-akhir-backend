import express from 'express';
// eslint-disable-next-line import/extensions
import * as inventoryService from '../services/inventoryService.js';

const inventoryRouter = express.Router();

inventoryRouter.get('/', inventoryService.getInventory);
inventoryRouter.post('/', inventoryService.addItemToInventory);
inventoryRouter.put('/:id', inventoryService.updateItem);
inventoryRouter.delete('/:id', inventoryService.deleteItem);

export default inventoryRouter;
