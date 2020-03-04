import { Patrocinador } from 'src/app/patrocinadores/patrocinador';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GrupoService } from './../grupo.service';
import { ToastaService } from 'ngx-toasta';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';

import { PatrocinadorService } from './../../patrocinadores/patrocinador.service';
import { PatrocinadorFiltro } from './../../patrocinadores/patrocinadorFiltro';
import { PlanoFiltro } from './../../planos/planoFiltro';
import { PlanoService } from './../../planos/plano.service';
import { Grupo } from '../grupo';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css']
})
export class GrupoCadastroComponent implements OnInit {
  
  patrocinadorRetorno = new Patrocinador;
  planos= [];
  grupo = new Grupo;
  patrocinadores = [];
  patrocinadoresSelecionados = [];
  listaPatrocinadores = [];

  constructor(
    private planoService: PlanoService,
    private patrocinadorService: PatrocinadorService,
    private grupoService: GrupoService,
    private errorHandlerService: ErrorHandlerService,
    private toastaService: ToastaService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  
  ngOnInit() {
    this.carregarPlanos();
    this.carregarPatrocinadores();
    //this.carregarPatrocinadordoGrupo();

    this.title.setTitle('Cadastro de Grupos');
    const codigoGrupo = this.route.snapshot.params['codigo'];

    if(codigoGrupo) {
      this.title.setTitle('Edição de Grupos');
      this.carregarGrupo(codigoGrupo);
      this.carregarPatrocinadordoGrupo(codigoGrupo);
    }
  }

  get novoEditar() {
    return Boolean(this.grupo.codigo)
  }


  carregarPatrocinadordoGrupo (codigo: number) {
    this.grupoService.buscarPatrocinadorDoGrupo(codigo)
    .then(patrocinadores => {
      this.patrocinadorRetorno = patrocinadores;
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  
  carregarGrupo (codigo: number) {
    this.grupoService.buscarPorCodigo(codigo)
    .then(grupo => {
      this.grupo = grupo, 

      this.patrocinadoresSelecionados = this.grupo.patrocinadores;
      
      const pLista = [];
      this.patrocinadores.map((p) => {
        pLista.push(p.razaosocial);
      })
      
      const pSelect = [];
      this.patrocinadoresSelecionados.map((p) => {
        pSelect.push(p.razaosocial);
      })

      for (let cont = 0; cont < this.patrocinadores.length; cont++){
        
        if (pSelect.includes(this.patrocinadores[cont].razaosocial) === false) {
          this.listaPatrocinadores.push(this.patrocinadores[cont])
        }
      
      }
      this.patrocinadores = this.listaPatrocinadores;

    })
    .catch(erro => this.errorHandlerService.handle(erro));

  }
            
  carregarPlanos() {
    const filtro: PlanoFiltro = {
      nome: ''
    }
    return this.planoService.pesquisar(filtro)
    .then(planos => {
      this.planos = planos.map(p => {
        return {label: p.nome, value: p.codigo};
      });
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarPatrocinadores() {
    const filtro: PatrocinadorFiltro = {
      razaosocial: '',
      nomeabreviado: ''
    }
    return this.patrocinadorService.pesquisar(filtro)
    .then(patrocinadores => { 
      this.patrocinadores = patrocinadores})
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    /*if (this.novoEditar === false) {
      this.grupo.ativo = false;
    }*/
    this.grupo.patrocinadores = this.patrocinadoresSelecionados;
    this.grupoService.adicionar(this.grupo)
    .then(() => {
      if (this.novoEditar === false) {
        this.toastaService.success('Grupo adicionado com sucesso!');
      } else {
        this.toastaService.success('Grupo editado com sucesso!');
      }
      this.router.navigate(['/grupos']);
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

}
