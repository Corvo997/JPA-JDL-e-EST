import { IConsulta } from 'app/shared/model/consulta.model';
import { IFuncionario } from 'app/shared/model/funcionario.model';

export interface IConsultorio {
  id?: number;
  nome?: string;
  consultas?: IConsulta;
  funcionario?: IFuncionario;
}

export class Consultorio implements IConsultorio {
  constructor(public id?: number, public nome?: string, public consultas?: IConsulta, public funcionario?: IFuncionario) {}
}
