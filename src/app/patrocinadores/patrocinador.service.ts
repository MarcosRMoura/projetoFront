import { MoneyHttp } from './../seguranca/money-http';
import { PatrocinadorFiltro } from './patrocinadorFiltro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patrocinador } from './patrocinador';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadorService {

  patrocinadoresUrl = 'http://localhost:8080/patrocinadores';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: PatrocinadorFiltro) {
    const headers = new HttpHeaders ();
    let params = new HttpParams();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    if (filtro.razaosocial) {
      params = params.append('razaoSocial', filtro.razaosocial);
    }
    
    if (filtro.nomeabreviado) {
      params = params.append('nomeAbreviado', filtro.nomeabreviado);
    }

    return this.http.get<any>(`${this.patrocinadoresUrl}`, 
      {headers, params} )
    .toPromise()
    .then(response => response.content);
  }

  excluir(codigo: number) : Promise<any> {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.delete<any>(`${this.patrocinadoresUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);
  }

  adicionar(patrocinador: Patrocinador) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.patrocinadoresUrl,(patrocinador), {headers})
    .toPromise()
    .then(response => response);
  }

  buscarPorCodigo (codigo: number) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.get<Patrocinador>(`${this.patrocinadoresUrl}/${codigo}`, {headers})
    .toPromise()
    .then(response => response);
  }

}