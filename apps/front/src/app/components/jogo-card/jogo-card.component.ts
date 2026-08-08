import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Jogo } from '../../models/jogo';

@Component({
  selector: 'app-jogo-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jogo-card.component.html',
  styleUrl: './jogo-card.component.css',
})
export class JogoCardComponent {
  @Input({ required: true }) jogo!: Jogo;
}
