import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { registrarSessao, autenticar } from '../middleware/autenticacao';
import { Usuario, UsuarioLogado } from '../models/usuario';
import { getCollection } from '../util/get-collection';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).send({ mensagem: 'Informe o login e a senha.' });
  }

  const usuarios = getCollection<Usuario>(req.app, 'usuarios');
  const usuario = await usuarios.findOne({ login, senha });

  if (!usuario) {
    return res.status(401).send({ mensagem: 'Login ou senha inválidos.' });
  }

  const usuarioLogado: UsuarioLogado = {
    _id: usuario._id,
    login: usuario.login,
    nome: usuario.nome,
    administrador: usuario.administrador,
  };
  const token = randomUUID();

  registrarSessao(token, usuarioLogado);
  return res.send({ token, usuario: usuarioLogado });
});

authRouter.get('/sessao', autenticar, (req, res) => {
  return res.send(res.locals.usuario);
});
