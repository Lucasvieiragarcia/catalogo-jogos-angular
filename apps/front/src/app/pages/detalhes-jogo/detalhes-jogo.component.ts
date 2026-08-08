import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { JogosService } from '../../services/jogos.service';

@Component({
  selector: 'app-detalhes-jogo',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './detalhes-jogo.component.html',
  styleUrl: './detalhes-jogo.component.css',
})
export class DetalhesJogoComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly jogosService = inject(JogosService);

  protected mensagemErro = '';
  protected readonly jogo$ = this.route.paramMap.pipe(
    switchMap((parametros) =>
      this.jogosService.buscarPorId(parametros.get('id') || ''),
    ),
    catchError(() => {
      this.mensagemErro = 'O jogo solicitado não foi encontrado.';
      return of(null);
    }),
  );
}
