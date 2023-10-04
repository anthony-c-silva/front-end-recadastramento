import {Grupos} from './Grupos'

export class Usuario {
  id?: number;
  login?: string;
  nome?: string;
  ativo?: boolean;
  email?: string;
  senha?: string;
  grupos?: Grupos;
}
