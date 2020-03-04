import { Cliente } from './cliente';
import { Grupo } from './../grupos/grupo';
import { Patrocinador } from './../patrocinadores/patrocinador';

export class Pessoa {
    codigo: number;
    nome: string;
    dataNascimento: Date;
    cpf: string;
    ativo: boolean;
    cliente = new Cliente;
}