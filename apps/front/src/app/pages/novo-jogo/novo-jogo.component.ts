import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { JogosService } from '../../services/jogos.service';

@Component({
  selector: 'app-novo-jogo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './novo-jogo.component.html',
  styleUrl: './novo-jogo.component.css',
})
export class NovoJogoComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly jogosService = inject(JogosService);
  private readonly router = inject(Router);

  protected readonly anoAtual = new Date().getFullYear();
  protected carregando = false;
  protected mensagemErro = '';
  protected readonly formulario = this.formBuilder.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    imagemUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    genero: ['', Validators.required],
    plataforma: ['', Validators.required],
    anoLancamento: [this.anoAtual, [Validators.required, Validators.min(1970), Validators.max(this.anoAtual)]],
    horasDuracao: [0, [Validators.required, Validators.min(0)]],
    nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
  });

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagemErro = '';

    this.jogosService
      .cadastrar(this.formulario.getRawValue())
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (jogo) => this.router.navigate(['/jogos', jogo._id]),
        error: (erro: HttpErrorResponse) => {
          this.mensagemErro =
            erro.status === 401
              ? 'Sua sessão expirou. Saia e entre novamente.'
              : erro.error?.mensagem || 'Não foi possível salvar o jogo.';
        },
      });
  }
}
