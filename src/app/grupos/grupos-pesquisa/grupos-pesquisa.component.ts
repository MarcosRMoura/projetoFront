import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GrupoFiltro } from './../grupoFiltro';
import { PlanoFiltro } from './../../planos/planoFiltro';
import { PlanoService } from './../../planos/plano.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { ToastaService } from 'ngx-toasta';
import { GrupoService } from './../grupo.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-grupos-pesquisa',
  templateUrl: './grupos-pesquisa.component.html',
  styleUrls: ['./grupos-pesquisa.component.css']
})
export class GruposPesquisaComponent implements OnInit {

  grupoPesquisa: string;
  planoPesquisa: string;
  grupos: [];
  planosDropdow: [];
  gruposDropdow: [];
  @ViewChild('tabela', {static:true} ) grid;

  constructor(
    private grupoService: GrupoService,
    private planoService: PlanoService,
    private toasta: ToastaService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private router: Router 
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Grupos');
    this.carregarPlanos();
    this.carregarGrupos();
    this.pesquisar();
  }

  carregarPlanos() {
    const filtro: PlanoFiltro = {
      nome: ''
    }
    return this.planoService.pesquisar(filtro)
    .then(planosDropdow => {
      this.planosDropdow = planosDropdow.map(p => {
        return {label: p.nome, value: p.codigo};
      });
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarGrupos() {
    const filtro: GrupoFiltro = {
      nome: '',
      plano: '',
    }
    return this.grupoService.pesquisar(filtro)
    .then(gruposDropdow => {
      this.gruposDropdow = gruposDropdow.map(g => {
        return {label: g.nome, value: g.nome};
      })
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }
  
  pesquisar() {
    const filtro: GrupoFiltro = {
      nome : this.grupoPesquisa,
      plano: this.planoPesquisa,
    };

    this.grupoService.pesquisar( filtro )
    .then(grupos => this.grupos = grupos)
    .catch(erro => this.errorHandlerService.handle(erro));
  };

  excluir(grupo: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.grupoService.excluir( grupo.codigo )
        .then(() => {
          this.pesquisar();
          this.grid.first = 0;
          this.toasta.success('Grupo excluído com sucesso!');
        })
        .catch(erro => this.errorHandlerService.handle(erro));
      }
    });
  }

  limpar() {
    this.grupoPesquisa = '',
    this.planoPesquisa = '',
    this.pesquisar();
  }

}
