import { PlanosRoutingModule } from './planos-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { PlanosPesquisaComponent } from './planos-pesquisa/planos-pesquisa.component';
import { PlanoCadastroComponent } from './plano-cadastro/plano-cadastro.component';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [
    PlanoCadastroComponent,
    PlanosPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    InputTextModule,
    TableModule,
    ButtonModule,

    SharedModule,
    PlanosRoutingModule
  ],
  exports: []
})
export class PlanosModule { }
