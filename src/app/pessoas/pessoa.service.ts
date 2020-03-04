import { MoneyHttp } from './../seguranca/money-http';
import { PessoaFiltro } from './pessoaFiltro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from './pessoa';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: PessoaFiltro) {
    const headers = new HttpHeaders ();
    let params = new HttpParams();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}?`,
     {headers, params} )
    .toPromise()
    .then(response => response.content);
  }

  excluir(codigo: number) : Promise<any> {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.delete<any>(`${this.pessoasUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);
  }

  adicionar(pessoa: Pessoa) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.pessoasUrl,(pessoa), {headers})
    .toPromise()
    .then(response => response);
  }

  buscarPorCodigo (codigo: number) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, {headers})
    .toPromise()
    .then(response => {
      const pessoa = response as Pessoa

      this.converterStringsParaDatas([pessoa]);

      return pessoa;
    });
}

  private converterStringsParaDatas(pessoas: Pessoa[]) {
    for (const pessoa of pessoas) {
      pessoa.dataNascimento = moment(pessoa.dataNascimento,
        'YYYY-MM-DD').toDate();

        if (pessoa.cliente.dataAquisicao) {
          pessoa.cliente.dataAquisicao = moment(pessoa.cliente.dataAquisicao,
            'YYYY-MM-DD').toDate();
        }
    }
  }

}