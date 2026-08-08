import { DuracaoPipe } from './duracao.pipe';

describe('DuracaoPipe', () => {
  const pipe = new DuracaoPipe();

  it('deve formatar uma hora no singular', () => {
    expect(pipe.transform(1)).toBe('1 hora');
  });

  it('deve formatar várias horas no plural', () => {
    expect(pipe.transform(25)).toBe('25 horas');
  });

  it('deve tratar durações menores que uma hora', () => {
    expect(pipe.transform(0.5)).toBe('Menos de 1 hora');
  });
});
