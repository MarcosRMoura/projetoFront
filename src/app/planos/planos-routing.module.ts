import { AuthGuard } from './../seguranca/auth.guard';
import { PlanoCadastroComponent } from './plano-cadastro/plano-cadastro.component';
import { PlanosPesquisaComponent } from './planos-pesquisa/planos-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'planos', component: PlanosPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'planos/novo', component: PlanoCadastroComponent, canActivate: [AuthGuard] },
  { path: 'planos/:codigo', component: PlanoCadastroComponent, canActivate: [AuthGuard] },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosRoutingModule { }
