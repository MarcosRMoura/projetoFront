import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastaService } from 'ngx-toasta';
import { PlanoService } from './../plano.service';
import { Plano } from './../plano';

@Component({
  selector: 'app-plano-cadastro',
  templateUrl: './plano-cadastro.component.html',
  styleUrls: ['./plano-cadastro.component.css']
})
export class PlanoCadastroComponent implements OnInit {


  plano = new Plano;

  constructor(
    private planoService: PlanoService,
    private toastaService: ToastaService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Planos');
    const codigoPlano = this.route.snapshot.params['codigo'];

    if(codigoPlano) {
      this.title.setTitle('Edição de Planos');
      this.carregarPlano(codigoPlano);
    }
  }

  get novoEditar() {
    return Boolean(this.plano.codigo)
  }
  
  carregarPlano (codigo: number) {
    this.planoService.buscarPorCodigo(codigo)
    .then(plano => {
      this.plano = plano;
    })
    .catch(erro => this.errorHandlerService.handle(erro));
    
  }
  
  salvar(form: FormControl) {
    this.planoService.adicionar(this.plano)
    .then(() => {
      if (this.novoEditar === false) {
        this.toastaService.success('Plano adicionado com sucesso!');
      } else {
        this.toastaService.success('Plano editado com sucesso!');
      }

      this.router.navigate(['/planos']);
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }
}
