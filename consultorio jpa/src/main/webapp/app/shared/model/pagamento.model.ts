import { IConsulta } from 'app/shared/model/consulta.model';
import { TipoPagamento } from 'app/shared/model/enumerations/tipo-pagamento.model';

export interface IPagamento {
  id?: number;
  valor?: number;
  tipoPagameno?: TipoPagamento;
  consultas?: IConsulta[];
}

export class Pagamento implements IPagamento {
  constructor(public id?: number, public valor?: number, public tipoPagameno?: TipoPagamento, public consultas?: IConsulta[]) {}
}
