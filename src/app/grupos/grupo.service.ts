import { MoneyHttp } from './../seguranca/money-http';
import { Patrocinador } from './../patrocinadores/patrocinador';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Grupo } from './grupo';
import { GrupoFiltro } from './grupoFiltro';


@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  
  gruposUrl = 'http://localhost:8080/grupos';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: GrupoFiltro) {
    const headers = new HttpHeaders ();
    let params = new HttpParams();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }
    
    if (filtro.plano) {
      params = params.append('plano', filtro.plano);
    }

    return this.http.get<any>(`${this.gruposUrl}?`,
    { headers,  params })
    .toPromise()
    .then(response => response.content);
  }

  excluir(codigo: number) : Promise<any> {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.delete<any>(`${this.gruposUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);
  }

  adicionar(grupo: Grupo) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.gruposUrl,(grupo), {headers})
    .toPromise()
    .then(response => response);
  }

  buscarPorCodigo (codigo: number) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.get<Grupo>(`${this.gruposUrl}/${codigo}`, {headers})
    .toPromise()
    .then(response => response);
  }

  buscarPatrocinadorDoGrupo (codigo: number) {
    const headers = new HttpHeaders ();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.get<Patrocinador>(`${this.gruposUrl}/${codigo}`, {headers})
    .toPromise()
    .then(response => response);
  }

}
