import { MoneyHttp } from './../seguranca/money-http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PagamentoFiltro } from './pagamentoFiltro';
import * as moment from 'moment';
import { Pagamento } from './pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  pagamentosUrl = 'http://localhost:8080/pagamentos';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: PagamentoFiltro) {
    const headers = new HttpHeaders ();
    let params = new HttpParams();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    if (filtro.dataDePagamentoDe) {
      params = params.append('dataPagamentoDe', moment(filtro.dataDePagamentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataDePagamentoAte) {
      params = params.append('dataPagamentoAte', moment(filtro.dataDePagamentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.pagamentosUrl}?`,
     {headers, params} )
    .toPromise()
    .then(response => response.content);
  }

  excluir(codigo: number) : Promise<any> {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.delete<any>(`${this.pagamentosUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);
  }

  adicionar(pagamento: Pagamento) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.pagamentosUrl,(pagamento), {headers})
    .toPromise()
    .then(response => response);
  }

  buscarPorCodigo (codigo: number) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.get<Pagamento>(`${this.pagamentosUrl}/${codigo}`, {headers})
    .toPromise()
    .then(response => {
      const pagamento = response as Pagamento

      this.converterStringsParaDatas([pagamento]);

      return pagamento;
    });
}

  private converterStringsParaDatas(pagamentos: Pagamento[]) {
    for (const pagamento of pagamentos) {
      pagamento.pessoa.dataNascimento = moment(pagamento.pessoa.dataNascimento,
        'YYYY-MM-DD').toDate();

        if (pagamento.dataPagamento) {
          pagamento.dataPagamento = moment(pagamento.dataPagamento,
            'YYYY-MM-DD').toDate();
        }
    }
  }

}