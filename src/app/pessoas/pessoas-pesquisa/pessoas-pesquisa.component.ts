import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { ToastaService } from 'ngx-toasta';
import { PessoaFiltro } from '../pessoaFiltro';
import { PessoaService } from '../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  nome: string;
  pessoas = [];
  @ViewChild('tabela', {static:true} ) grid;
  
  constructor(
    private pessoaService: PessoaService,
    private toasta: ToastaService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
    this.pesquisar();
  }
  
  pesquisar() {
    const filtro: PessoaFiltro = {
      nome: this.nome
    }

    this.pessoaService.pesquisar( filtro )
    .then(pessoas => this.pessoas = pessoas)
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  excluir(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.pessoaService.excluir( pessoa.codigo )
        .then(() => {
          this.pesquisar();
          this.grid.first = 0;
          this.toasta.success('Pessoa excluído com sucesso!');
        })
        .catch(erro => this.errorHandlerService.handle(erro));
      }
    });
  }

  limpar() {
    this.nome = '',
    this.pesquisar();
  }

}