import { Moment } from 'moment';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IConsultorio } from 'app/shared/model/consultorio.model';
import { TipoProcedimento } from 'app/shared/model/enumerations/tipo-procedimento.model';

export interface IConsulta {
  id?: number;
  dataConsulta?: Moment;
  tipoProcedimento?: TipoProcedimento;
  pagamento?: IPagamento;
  pessoas?: IPessoa[];
  consultorios?: IConsultorio[];
}

export class Consulta implements IConsulta {
  constructor(
    public id?: number,
    public dataConsulta?: Moment,
    public tipoProcedimento?: TipoProcedimento,
    public pagamento?: IPagamento,
    public pessoas?: IPessoa[],
    public consultorios?: IConsultorio[]
  ) {}
}
