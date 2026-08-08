import { ObjectId } from 'mongodb';
import { Router } from 'express';
import { autenticar } from '../middleware/autenticacao';
import { Jogo } from '../models/jogo';
import { getCollection } from '../util/get-collection';

export const jogosRouter = Router();

jogosRouter.get('/', async (req, res) => {
  const jogos = await getCollection<Jogo>(req.app, 'jogos')
    .find()
    .sort({ titulo: 1 })
    .toArray();

  return res.send(jogos);
});

jogosRouter.get('/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ mensagem: 'Identificador inválido.' });
  }

  const jogo = await getCollection<Jogo>(req.app, 'jogos').findOne({
    _id: new ObjectId(req.params.id),
  });

  if (!jogo) {
    return res.status(404).send({ mensagem: 'Jogo não encontrado.' });
  }

  return res.send(jogo);
});

jogosRouter.post('/', autenticar, async (req, res) => {
  const {
    titulo,
    imagemUrl,
    genero,
    plataforma,
    anoLancamento,
    horasDuracao,
    nota,
    descricao,
  } = req.body;

  if (!titulo || !imagemUrl || !genero || !plataforma || !descricao) {
    return res.status(400).send({ mensagem: 'Preencha todos os campos obrigatórios.' });
  }

  const jogo: Jogo = {
    titulo: titulo.trim(),
    imagemUrl: imagemUrl.trim(),
    genero: genero.trim(),
    plataforma: plataforma.trim(),
    anoLancamento: Number(anoLancamento),
    horasDuracao: Number(horasDuracao),
    nota: Number(nota),
    descricao: descricao.trim(),
    criadoPor: res.locals.usuario._id,
  };

  if (
    !Number.isInteger(jogo.anoLancamento) ||
    jogo.horasDuracao < 0 ||
    jogo.nota < 0 ||
    jogo.nota > 10
  ) {
    return res.status(400).send({ mensagem: 'Confira os valores numéricos informados.' });
  }

  const resultado = await getCollection<Jogo>(req.app, 'jogos').insertOne(jogo);
  return res.status(201).send({ ...jogo, _id: resultado.insertedId });
});
