import { AuthGuard } from './../seguranca/auth.guard';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';
import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'grupos', component: GruposPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'grupos/novo', component: GrupoCadastroComponent, canActivate: [AuthGuard] },
  { path: 'grupos/:codigo', component: GrupoCadastroComponent, canActivate: [AuthGuard] },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
