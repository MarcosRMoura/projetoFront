import { Planoi } from './../planoi';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PlanoFiltro } from './../planoFiltro';
import { PlanoService } from './../plano.service';
import { ToastaService } from 'ngx-toasta';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-planos-pesquisa',
  templateUrl: './planos-pesquisa.component.html',
  styleUrls: ['./planos-pesquisa.component.css']
})
export class PlanosPesquisaComponent implements OnInit {

  nome: string;
  planos: Planoi[];
  @ViewChild('tabela', {static:true} ) grid;

  constructor(
    private planoService: PlanoService,
    private toasta: ToastaService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title, 
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Planos');
    this.pesquisar();
  }
  
  pesquisar() {
    const filtro: PlanoFiltro = {
      nome: this.nome
    }

    this.planoService.pesquisar( filtro )
    .then(planos => this.planos = planos)
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  excluir(plano: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.planoService.excluir( plano.codigo )
        .then(() => {
          this.pesquisar();

          this.toasta.success('Plano excluído com sucesso!');
        })
        .catch(erro => this.errorHandlerService.handle(erro));
      }
    });
  }

  limpar() {
    this.nome ='',
    this.pesquisar()
  }

}