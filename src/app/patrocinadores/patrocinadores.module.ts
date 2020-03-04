import { PatrocinadoresRoutingModule } from './patrocinadores-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { PatrocinadoresPesquisaComponent } from './patrocinadores-pesquisa/patrocinadores-pesquisa.component';
import { PatrocinadorCadastrarComponent } from './patrocinador-cadastrar/patrocinador-cadastrar.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    PatrocinadorCadastrarComponent,
    PatrocinadoresPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,

    SharedModule,
    PatrocinadoresRoutingModule
  ],
  exports: []
})
export class PatrocinadoresModule { }
