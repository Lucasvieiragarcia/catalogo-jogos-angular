export interface UsuarioLogado {
  _id: number;
  login: string;
  nome: string;
  administrador: boolean;
}

export interface RespostaLogin {
  token: string;
  usuario: UsuarioLogado;
}
