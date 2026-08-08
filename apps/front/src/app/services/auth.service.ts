import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RespostaLogin, UsuarioLogado } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://localhost:3333/api/auth';
  private readonly usuarioSubject = new BehaviorSubject<UsuarioLogado | null>(
    this.carregarUsuario(),
  );

  readonly usuario$ = this.usuarioSubject.asObservable();

  login(login: string, senha: string): Observable<RespostaLogin> {
    return this.http
      .post<RespostaLogin>(`${this.apiUrl}/login`, { login, senha })
      .pipe(
        tap((resposta) => {
          localStorage.setItem('token', resposta.token);
          localStorage.setItem('usuario', JSON.stringify(resposta.usuario));
          this.usuarioSubject.next(resposta.usuario);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  estaAutenticado() {
    return Boolean(localStorage.getItem('token'));
  }

  private carregarUsuario(): UsuarioLogado | null {
    const usuario = localStorage.getItem('usuario');

    try {
      return usuario ? JSON.parse(usuario) : null;
    } catch {
      localStorage.removeItem('usuario');
      return null;
    }
  }
}
