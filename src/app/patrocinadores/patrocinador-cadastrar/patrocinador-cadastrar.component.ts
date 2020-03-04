import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormControl } from '@angular/forms';
import { ToastaService } from 'ngx-toasta';
import { PatrocinadorService } from './../patrocinador.service';
import { Component, OnInit } from '@angular/core';
import { Patrocinador } from '../patrocinador';

@Component({
  selector: 'app-patrocinador-cadastrar',
  templateUrl: './patrocinador-cadastrar.component.html',
  styleUrls: ['./patrocinador-cadastrar.component.css']
})
export class PatrocinadorCadastrarComponent implements OnInit {

  patrocinador = new Patrocinador;

  constructor(
    private patrocinadorService: PatrocinadorService,
    private toastaService: ToastaService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Patrocinadores');
    const codigoPatrocinador = this.route.snapshot.params['codigo'];

    if(codigoPatrocinador) {
      this.title.setTitle('Edição de Patrocinadores');
      this.carregarPatrocinador(codigoPatrocinador);
    }
  }

  get novoEditar() {
    return Boolean(this.patrocinador.codigo)
  }

  carregarPatrocinador (codigo: number) {
    this.patrocinadorService.buscarPorCodigo(codigo)
      .then(patrocinador => {
      this.patrocinador = patrocinador;
    })
    .catch(erro => this.errorHandlerService.handle(erro));
    
  }

  salvar(form: FormControl) {
    this.patrocinadorService.adicionar(this.patrocinador)
    .then(() => {
      if (this.novoEditar === false) {
        this.toastaService.success('Patrocinador adicionado com sucesso!');
      } else {
        this.toastaService.success('Patrocinador editado com sucesso!');
      }

      this.router.navigate(['/patrocinadores']);
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

}
