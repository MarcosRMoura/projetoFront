import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Pessoa } from './../pessoa';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastaService } from 'ngx-toasta';
import { GrupoService } from './../../grupos/grupo.service';
import { PatrocinadorService } from './../../patrocinadores/patrocinador.service';
import { Component, OnInit } from '@angular/core';
import { PatrocinadorFiltro } from 'src/app/patrocinadores/patrocinadorFiltro';
import { PessoaService } from '../pessoa.service';
import { GrupoFiltro } from 'src/app/grupos/grupoFiltro';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.component.html',
  styleUrls: ['./pessoa-cadastrar.component.css']
})
export class PessoaCadastrarComponent implements OnInit {

  pessoa = new Pessoa;
  patrocinadores: [];
  grupos: [];

  constructor(
    private patrocinadorService: PatrocinadorService,
    private grupoService: GrupoService,
    private pessoaService: PessoaService,
    private toastaService: ToastaService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregarGrupos();
    this.carregarPatrocinadores();
    this.title.setTitle('Cadastro de Pessoas');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa) {
      this.title.setTitle('Edição de Pessoas');
      this.carregarPessoa(codigoPessoa);
    }
  }

  get novoEditar() {
    return Boolean(this.pessoa.codigo)
  }
  
  carregarPessoa (codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
    })
    .catch(erro => this.errorHandlerService.handle(erro));
    
  }

  carregarPatrocinadores() {
    const filtro: PatrocinadorFiltro = {
      razaosocial: '',
      nomeabreviado: '',
    }
    return this.patrocinadorService.pesquisar(filtro)
    .then(patrocinadores => {
      this.patrocinadores = patrocinadores.map(p => {
        return {label: p.razaosocial, value: p.codigo};
      })
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarGrupos() {
    const filtro: GrupoFiltro = {
      nome: '',
      plano: '',
    }
    return this.grupoService.pesquisar(filtro)
    .then(grupos => {
      this.grupos = grupos.map(g => {
        return {label: g.nome, value: g.codigo};
      })
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      if (this.novoEditar === false) {
        this.toastaService.success('Pessoa adicionada com sucesso!');
      } else {
        this.toastaService.success('Pessoa editada com sucesso!');
      }
      
      this.router.navigate(['/pessoas']);
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

}
