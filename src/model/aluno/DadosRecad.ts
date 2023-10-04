import { DadosBasicosDto } from "./DadosBasicosDto";
import { DadosComplementaresDto } from "./DadosComplementaresDto";
import { DadosEnderecoDto } from "./DadosEnderecoDto";
import { Recad } from "./Recad";
import {DadosDocumentos} from './DadosDocumentos'
export class DadosRecad {
  idConfigRecad?: number;
  idPedidoRecad?: number;
  email?: string;
  dadosBasicosDto?: DadosBasicosDto;
  dadosComplementaresDto?: DadosComplementaresDto;
  dadosEnderecoDto?: DadosEnderecoDto;
  dadosDocumentos?: DadosDocumentos;
  recad?: Recad;
}
