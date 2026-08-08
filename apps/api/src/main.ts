import express from 'express';
import * as path from 'path';
import { mongodbUri } from './mongodb-uri';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { jogosRouter } from './routes/jogos';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/auth', authRouter);
app.use('/api/jogos', jogosRouter);

const port = process.env.PORT || 3333;

MongoClient.connect(mongodbUri)
  .then((client: MongoClient) => {
    app.locals.db = client.db('catalogo-jogos');

    const server = app.listen(port, () => {
      console.log(`API disponível em http://localhost:${port}/api`);
      console.log(`Conectado ao MongoDB em ${mongodbUri}`);
    });

    server.on('error', console.error);
  })
  .catch((erro) => {
    console.error('Não foi possível conectar ao MongoDB.', erro);
  });
