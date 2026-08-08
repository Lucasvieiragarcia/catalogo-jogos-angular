import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from '../models/jogo';

@Injectable({ providedIn: 'root' })
export class JogosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3333/api/jogos';

  listar(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Jogo> {
    return this.http.get<Jogo>(`${this.apiUrl}/${id}`);
  }
}
