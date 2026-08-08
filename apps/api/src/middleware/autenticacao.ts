import { NextFunction, Request, Response } from 'express';
import { UsuarioLogado } from '../models/usuario';

const sessoes = new Map<string, UsuarioLogado>();

export function registrarSessao(token: string, usuario: UsuarioLogado) {
  sessoes.set(token, usuario);
}

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const usuario = token ? sessoes.get(token) : undefined;

  if (!usuario) {
    return res.status(401).send({ mensagem: 'Faça login para continuar.' });
  }

  res.locals.usuario = usuario;
  return next();
}
