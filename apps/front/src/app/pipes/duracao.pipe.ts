import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duracao',
  standalone: true,
})
export class DuracaoPipe implements PipeTransform {
  transform(horas: number): string {
    if (horas < 1) {
      return 'Menos de 1 hora';
    }

    return horas === 1 ? '1 hora' : `${horas} horas`;
  }
}
