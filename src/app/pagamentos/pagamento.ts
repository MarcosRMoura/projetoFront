import { Pessoa } from './../pessoas/pessoa';

export class Pagamento {
    codigo: number;
    pessoa = new Pessoa;
    valor: number;
    dataPagamento: Date;
}