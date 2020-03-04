import { AuthGuard } from './../seguranca/auth.guard';
import { PessoaCadastrarComponent } from './pessoa-cadastrar/pessoa-cadastrar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'pessoas/novo', component: PessoaCadastrarComponent, canActivate: [AuthGuard] },
  { path: 'pessoas/:codigo', component: PessoaCadastrarComponent, canActivate: [AuthGuard] },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
