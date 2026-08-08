import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected carregando = false;
  protected mensagemErro = '';
  protected readonly formulario = this.formBuilder.nonNullable.group({
    login: ['', Validators.required],
    senha: ['', Validators.required],
  });

  entrar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagemErro = '';
    const { login, senha } = this.formulario.getRawValue();

    this.auth
      .login(login, senha)
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: () => {
          const destino = this.route.snapshot.queryParamMap.get('retorno') || '/jogos/novo';
          this.router.navigateByUrl(destino);
        },
        error: (erro: HttpErrorResponse) => {
          this.mensagemErro = erro.error?.mensagem || 'Não foi possível entrar.';
        },
      });
  }
}
