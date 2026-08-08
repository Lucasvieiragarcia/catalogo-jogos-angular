import fs from 'node:fs';
import path from 'node:path';
import { MongoClient } from 'mongodb';

const envPath = path.resolve('.env.local');
const envContents = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const uriFromFile = envContents
  .split(/\r?\n/)
  .find((line) => line.startsWith('MONGODB_URI='))
  ?.slice('MONGODB_URI='.length)
  .trim();
const mongoUri = process.env.MONGODB_URI || uriFromFile || 'mongodb://127.0.0.1:27017';

const client = await MongoClient.connect(mongoUri);
const db = client.db('catalogo-jogos');

await db.collection('usuarios').deleteMany({});
await db.collection('usuarios').insertMany([
  {
    _id: 1,
    login: 'admin',
    senha: 'admin',
    nome: 'Administrador',
    administrador: true,
  },
  {
    _id: 2,
    login: 'lucas',
    senha: 'jogos',
    nome: 'Lucas Garcia',
    administrador: false,
  },
]);

await db.collection('jogos').deleteMany({});
await db.collection('jogos').insertMany([
  {
    titulo: 'God of War',
    imagemUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg',
    genero: 'Ação e aventura',
    plataforma: 'PlayStation 4',
    anoLancamento: 2018,
    horasDuracao: 21,
    nota: 9.4,
    descricao: 'Kratos e Atreus atravessam os reinos nórdicos em uma jornada marcada por combates e descobertas.',
    criadoPor: 1,
  },
  {
    titulo: 'Red Dead Redemption 2',
    imagemUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg',
    genero: 'Ação e mundo aberto',
    plataforma: 'PlayStation 4',
    anoLancamento: 2018,
    horasDuracao: 50,
    nota: 9.6,
    descricao: 'Arthur Morgan enfrenta as mudanças do Velho Oeste enquanto tenta manter sua gangue unida.',
    criadoPor: 1,
  },
  {
    titulo: 'Hades',
    imagemUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg',
    genero: 'Roguelike',
    plataforma: 'Multiplataforma',
    anoLancamento: 2020,
    horasDuracao: 23,
    nota: 9.0,
    descricao: 'Zagreus tenta escapar do submundo usando armas e poderes concedidos pelos deuses do Olimpo.',
    criadoPor: 1,
  },
  {
    titulo: 'The Witcher 3',
    imagemUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg',
    genero: 'RPG',
    plataforma: 'Multiplataforma',
    anoLancamento: 2015,
    horasDuracao: 52,
    nota: 9.5,
    descricao: 'Geralt procura Ciri em um vasto mundo de fantasia repleto de escolhas e contratos de monstros.',
    criadoPor: 1,
  },
  {
    titulo: 'Elden Ring',
    imagemUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    genero: 'RPG de ação',
    plataforma: 'PlayStation 5',
    anoLancamento: 2022,
    horasDuracao: 60,
    nota: 10,
    descricao: 'Um aventureiro explora as Terras Intermédias em busca do poder do Anel Prístino.',
    criadoPor: 1,
  },
]);

await client.close();
console.log('Banco de dados preenchido com sucesso.');
