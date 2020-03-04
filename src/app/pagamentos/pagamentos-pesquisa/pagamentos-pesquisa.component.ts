import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { ToastaService } from 'ngx-toasta';
import { PagamentoFiltro } from './../pagamentoFiltro';
import { PagamentoService } from './../pagamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pagamentos-pesquisa',
  templateUrl: './pagamentos-pesquisa.component.html',
  styleUrls: ['./pagamentos-pesquisa.component.css']
})
export class PagamentosPesquisaComponent implements OnInit {

  nome: string;
  codPagamento: number;
  dataDePagamentoDe: Date;
  dataDePagamentoAte: Date;
  pagamentos = [];
  @ViewChild('tabela', {static:true} ) grid;

  constructor(
    private pagamentoService: PagamentoService,
    private toasta: ToastaService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.pesquisar();
    this.title.setTitle('Pesquisa de Pagamentos')
  }
  
  pesquisar() {
    const filtro: PagamentoFiltro = {
      nome: this.nome,
      codPagamento: this.codPagamento,
      dataDePagamentoDe: this.dataDePagamentoDe,
      dataDePagamentoAte: this.dataDePagamentoAte
    }

    this.pagamentoService.pesquisar( filtro )
    .then(pagamentos => this.pagamentos = pagamentos)
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  excluir(pagamento: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.pagamentoService.excluir( pagamento.codigo )
        .then(() => {
          this.pesquisar();
          this.grid.first = 0;
          this.toasta.success('Pagamento excluído com sucesso!');
        })
        .catch(erro => this.errorHandlerService.handle(erro));
      }
    });
  }

  limpar() {
    this.dataDePagamentoDe = null,
    this.dataDePagamentoAte = null,
    this.pesquisar();
  }

}