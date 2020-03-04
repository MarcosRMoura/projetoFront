import { GruposRoutingModule } from './grupos-routing.module';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';


@NgModule({
  declarations: [
    GrupoCadastroComponent,
    GruposPesquisaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    InputTextModule,
    ButtonModule,
    PickListModule,
    DropdownModule,
    TableModule,

    SharedModule,
    GruposRoutingModule
  ],
  exports: []
})
export class GruposModule { }
