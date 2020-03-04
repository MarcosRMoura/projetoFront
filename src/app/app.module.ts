import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { PlanosModule } from './planos/planos.module';
import { PatrocinadoresModule } from './patrocinadores/patrocinadores.module';
import { GruposModule } from './grupos/grupos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule,
    PlanosModule,
    PatrocinadoresModule,
    GruposModule,
    PessoasModule,
    PagamentosModule,
    AppRoutingModule,
    SegurancaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
