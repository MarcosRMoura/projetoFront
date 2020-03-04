import { PagamentosRoutingModule } from './pagamentos-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';

import { PagamentosPesquisaComponent } from './pagamentos-pesquisa/pagamentos-pesquisa.component';
import { PagamentoCadastrarComponent } from './pagamento-cadastrar/pagamento-cadastrar.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    PagamentoCadastrarComponent,
    PagamentosPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    CalendarModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,

    SharedModule,
    PagamentosRoutingModule
  ],
  exports: []
})
export class PagamentosModule { }
