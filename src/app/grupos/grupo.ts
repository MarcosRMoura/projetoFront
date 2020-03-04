import { Patrocinador } from './../patrocinadores/patrocinador';
import { Plano } from './../planos/plano';

export class Grupo {
    codigo: number;
    nome: string;
    plano = new Plano;
    patrocinadores = [Patrocinador];
    ativo: boolean;
}