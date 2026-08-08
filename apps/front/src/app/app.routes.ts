import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DetalhesJogoComponent } from './pages/detalhes-jogo/detalhes-jogo.component';
import { ListaJogosComponent } from './pages/lista-jogos/lista-jogos.component';
import { LoginComponent } from './pages/login/login.component';
import { NovoJogoComponent } from './pages/novo-jogo/novo-jogo.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'jogos', pathMatch: 'full' },
  { path: 'jogos', component: ListaJogosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'jogos/novo',
    component: NovoJogoComponent,
    canActivate: [authGuard],
  },
  { path: 'jogos/:id', component: DetalhesJogoComponent },
  { path: '**', redirectTo: 'jogos' },
];
