export interface Usuario {
  _id: number;
  login: string;
  senha: string;
  nome: string;
  administrador: boolean;
}

export type UsuarioLogado = Omit<Usuario, 'senha'>;
