import { ObjectId } from 'mongodb';

export interface Jogo {
  _id?: ObjectId;
  titulo: string;
  genero: string;
  plataforma: string;
  anoLancamento: number;
  horasDuracao: number;
  nota: number;
  descricao: string;
  criadoPor: number;
}
