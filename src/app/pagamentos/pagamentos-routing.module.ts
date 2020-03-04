import { AuthGuard } from './../seguranca/auth.guard';
import { PagamentoCadastrarComponent } from './pagamento-cadastrar/pagamento-cadastrar.component';
import { PagamentosPesquisaComponent } from './pagamentos-pesquisa/pagamentos-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'pagamentos', component: PagamentosPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'pagamentos/novo', component: PagamentoCadastrarComponent, canActivate: [AuthGuard] },
  { path: 'pagamentos/:codigo', component: PagamentoCadastrarComponent, canActivate: [AuthGuard] },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentosRoutingModule { }
