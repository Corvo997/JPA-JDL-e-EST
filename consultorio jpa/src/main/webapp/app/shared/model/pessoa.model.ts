import { IConsulta } from 'app/shared/model/consulta.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  cpf?: number;
  sexo?: boolean;
  consultas?: IConsulta[];
}

export class Pessoa implements IPessoa {
  constructor(public id?: number, public nome?: string, public cpf?: number, public sexo?: boolean, public consultas?: IConsulta[]) {
    this.sexo = this.sexo || false;
  }
}
