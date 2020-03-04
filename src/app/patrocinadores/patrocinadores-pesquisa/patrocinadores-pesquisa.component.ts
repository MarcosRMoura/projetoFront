import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { PatrocinadorFiltro } from './../patrocinadorFiltro';
import { PatrocinadorService } from './../patrocinador.service';
import { ToastaService } from 'ngx-toasta';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-patrocinadores-pesquisa',
  templateUrl: './patrocinadores-pesquisa.component.html',
  styleUrls: ['./patrocinadores-pesquisa.component.css']
})
export class PatrocinadoresPesquisaComponent implements OnInit {

  razaoSocial: string;
  nomeAbreviado: string
  patrocinadores = [];
  @ViewChild('tabela', {static:true} ) grid;

  constructor(
    private patrocinadorService: PatrocinadorService,
    private toasta: ToastaService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Patrocinadores')
    this.pesquisar();
  }

  pesquisar() {
    const filtro: PatrocinadorFiltro = {
      razaosocial: this.razaoSocial,
      nomeabreviado: this.nomeAbreviado
    }

    this.patrocinadorService.pesquisar( filtro )
    .then(patrocinadores => this.patrocinadores = patrocinadores)
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  excluir(patrocinador: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.patrocinadorService.excluir( patrocinador.codigo )
        .then(() => {
          this.pesquisar();
          this.grid.first = 0;
          this.toasta.success('Patrocinador excluído com sucesso!');
        })
        .catch(erro => this.errorHandlerService.handle(erro));
      }
    });
  }

  limpar() {
    this.razaoSocial = '',
    this.nomeAbreviado = '',
    this.pesquisar();
  }

}
