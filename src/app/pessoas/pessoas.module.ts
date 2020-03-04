import { PessoasRoutingModule } from './pessoas-routing.module';
import { RouterModule } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastrarComponent } from './pessoa-cadastrar/pessoa-cadastrar.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    PessoaCadastrarComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    CalendarModule,
    InputMaskModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    TableModule,
    DropdownModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoasModule { }
