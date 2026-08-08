import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo, NovoJogo } from '../models/jogo';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class JogosService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly apiUrl = 'http://localhost:3333/api/jogos';

  listar(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Jogo> {
    return this.http.get<Jogo>(`${this.apiUrl}/${id}`);
  }

  cadastrar(jogo: NovoJogo): Observable<Jogo> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.token || ''}`,
    });

    return this.http.post<Jogo>(this.apiUrl, jogo, { headers });
  }
}
