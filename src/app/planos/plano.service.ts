import { MoneyHttp } from './../seguranca/money-http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { PlanoFiltro } from './planoFiltro';
import { Plano } from './plano';


@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  planosUrl = 'http://localhost:8080/planos';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: PlanoFiltro) {
    const headers = new HttpHeaders ();
    let params = new HttpParams();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.planosUrl}?`,
     {headers, params} )
    .toPromise()
    .then(response => response.content)
  }

  excluir(codigo: number) : Promise<any> {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.delete<any>(`${this.planosUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);
  }

  adicionar(plano: Plano) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.planosUrl,(plano), {headers})
    .toPromise()
    .then(response => response);
  }

  buscarPorCodigo (codigo: number) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.get<Plano>(`${this.planosUrl}/${codigo}`, {headers})
    .toPromise()
    .then(response => response);
  }

}
