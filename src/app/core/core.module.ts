import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { MoneyHttp } from './../seguranca/money-http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtHelperService } from '@auth0/angular-jwt';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastaModule } from 'ngx-toasta';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastaModule.forRoot(),
    ConfirmDialogModule,
    

  ],
  exports: [
    NavbarComponent,
    ToastaModule,
    ConfirmDialogModule,
    FooterComponent
  ],
  providers: [
    ConfirmationService,
    JwtHelperService,
    MoneyHttp
  ]
})
export class CoreModule { }
