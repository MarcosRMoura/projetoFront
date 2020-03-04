import { AuthGuard } from './../seguranca/auth.guard';
import { PatrocinadoresPesquisaComponent } from './patrocinadores-pesquisa/patrocinadores-pesquisa.component';
import { PatrocinadorCadastrarComponent } from './patrocinador-cadastrar/patrocinador-cadastrar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'patrocinadores', component: PatrocinadoresPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'patrocinadores/novo', component: PatrocinadorCadastrarComponent, canActivate: [AuthGuard] },
  { path: 'patrocinadores/:codigo', component: PatrocinadorCadastrarComponent, canActivate: [AuthGuard] },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrocinadoresRoutingModule { }
