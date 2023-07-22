/* eslint-disable import/extensions */
import express from 'express';
// import { nanoid } from 'nanoid';
import 'dotenv/config';
import inventoryRouter from './routers/inventoryRouter.js';
import { errorResp } from './utils/response.js';

const app = express();

const port = 8100;
const host = 'localhost';

app.listen(port, host, () => {
  console.log(`server berjalan di http://${host}:${port}`);
});

app.use(express.json());
app.use('/api/inventory', inventoryRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  errorResp(res, 'Internal server error', 500);
});

// eslint-disable-next-line consistent-return
const validateInput = (req, res, next) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    return res.status(400).json({ error: 'Nama, quantity, dan price dibutuhkan saat menambahkan item' });
  }
  if (typeof quantity !== 'number' || quantity < 0 || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'value Quantity dan Price salah' });
  }
  next();
};
