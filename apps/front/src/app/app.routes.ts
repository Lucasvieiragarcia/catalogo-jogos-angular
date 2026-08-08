import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NovoJogoComponent } from './pages/novo-jogo/novo-jogo.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'jogos/novo',
    component: NovoJogoComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
