export interface Jogo {
  _id: string;
  titulo: string;
  genero: string;
  plataforma: string;
  anoLancamento: number;
  horasDuracao: number;
  nota: number;
  descricao: string;
  criadoPor: number;
}

export type NovoJogo = Omit<Jogo, '_id' | 'criadoPor'>;
