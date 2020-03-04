import { Patrocinador } from './../patrocinadores/patrocinador';
import { Grupo } from './../grupos/grupo';

export class Cliente {
    patrocinador = new Patrocinador;
    grupo = new Grupo;
    dataAquisicao: Date;
}