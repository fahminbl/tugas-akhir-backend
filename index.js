/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import helmet from 'helmet';
import express from 'express';
// import { nanoid } from 'nanoid';
import fs from 'fs';
import https from 'https';
import http from 'http';
import 'dotenv/config';
import inventoryRouter from './routers/inventoryRouter.js';
import userRouter from './routers/userRouter.js';
import { errorResp } from './utils/response.js';

// Load sertifikat dan kunci privat
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};
const app = express();

const port = 8100;
const host = 'localhost';

// app.listen(port, host, () => {
//   console.log(`server berjalan di http://${host}:${port}`);
// });

app.use(express.json());
app.use(helmet());
app.use('/api/v1/inventory', inventoryRouter);
app.use('/api', userRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  errorResp(res, 'Internal server error', 500);
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);
// https.createServer(options, app).listen(port, () => {
//   console.log(`Server berjalan di https://localhost:${port}`);
// });
httpServer.listen(8080);
console.log(`server berjalan pada port http://${host}:8080`);
httpsServer.listen(8443);
console.log(`server https berjalan pada port http://${host}:8443`);
