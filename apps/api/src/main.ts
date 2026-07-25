/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { mongodbUri } from './mongodb-uri';

import { MongoClient } from 'mongodb';

import cors from 'cors';

MongoClient.connect(mongodbUri).then((client: MongoClient) => {
  app.locals.db = client.db('app-favoritos');
  console.log(`Conectado ao MongoDB.`);
}).catch(err => {
  console.error(err);
});

const app = express();

// Usar CORS antes dos middlewares de roteamento:
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  console.log(`MongoDB connection configured from ${mongodbUri}`);
});
server.on('error', console.error);
