import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { JogoCardComponent } from '../../components/jogo-card/jogo-card.component';
import { JogosService } from '../../services/jogos.service';

@Component({
  selector: 'app-lista-jogos',
  standalone: true,
  imports: [AsyncPipe, RouterLink, JogoCardComponent],
  templateUrl: './lista-jogos.component.html',
  styleUrl: './lista-jogos.component.css',
})
export class ListaJogosComponent {
  private readonly jogosService = inject(JogosService);

  protected mensagemErro = '';
  protected readonly jogos$ = this.jogosService.listar().pipe(
    catchError(() => {
      this.mensagemErro = 'Não foi possível carregar o catálogo.';
      return of([]);
    }),
  );
}
