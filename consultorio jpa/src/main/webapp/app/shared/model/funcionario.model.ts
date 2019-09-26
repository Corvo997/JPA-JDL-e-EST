import { IConsultorio } from 'app/shared/model/consultorio.model';

export interface IFuncionario {
  id?: number;
  numeroRegistro?: number;
  nome?: string;
  salario?: number;
  consultorios?: IConsultorio[];
}

export class Funcionario implements IFuncionario {
  constructor(
    public id?: number,
    public numeroRegistro?: number,
    public nome?: string,
    public salario?: number,
    public consultorios?: IConsultorio[]
  ) {}
}
