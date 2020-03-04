import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PessoaFiltro } from './../../pessoas/pessoaFiltro';
import { PagamentoService } from './../pagamento.service';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastaService } from 'ngx-toasta';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pagamento } from '../pagamento';

@Component({
  selector: 'app-pagamento-cadastrar',
  templateUrl: './pagamento-cadastrar.component.html',
  styleUrls: ['./pagamento-cadastrar.component.css']
})
export class PagamentoCadastrarComponent implements OnInit {

  pagamento = new Pagamento;
  pessoas = []

  constructor(
    private pessoaService: PessoaService,
    private pagamentoService: PagamentoService,
    private toastaService: ToastaService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregarPessoas();
    this.title.setTitle('Cadastro de Pagamentos');
    const codigoPagamento = this.route.snapshot.params['codigo'];

    if(codigoPagamento) {
      this.title.setTitle('Edição de Pagamentos');
      this.carregarPagamento(codigoPagamento);
    }
  }

  get novoEditar() {
    return Boolean(this.pagamento.codigo)
  }
  
  carregarPagamento (codigo: number) {
    this.pagamentoService.buscarPorCodigo(codigo)
    .then(pagamento => {
      this.pagamento = pagamento;
    })
    .catch(erro => this.errorHandlerService.handle(erro));
    
  }

  carregarPessoas() {
    const filtro: PessoaFiltro = {
      nome: '',
    }
    return this.pessoaService.pesquisar(filtro)
    .then(pessoas => {
      this.pessoas = pessoas.map(p => {
        return {label: p.nome, value: p.codigo};
      })
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    //this.pessoa.ativo = true;
    this.pagamentoService.adicionar(this.pagamento)
    .then(() => {
      if (this.novoEditar === false) {
        this.toastaService.success('Pagamento adicionado com sucesso!');
      } else {
        this.toastaService.success('Pagamento editado com sucesso!');
      }
      
      this.router.navigate(['/pagamentos']);
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

}
