import { Escola } from "../Escola";
import { TabEstruturada } from "../tabEstruturada/TabEstruturada";

export class DadosComplementaresDto {
    idConfigRecad?: number;
    nacionalidadeDto?: {
        codigo: number,
        item: number,
        descricao: string
    };
    etniaDto?: {
        codigo: number,
        item: number,
        descricao: string
    };
    indDeficiencia?: string;
    pedidoDeficRecad?: [{
        deficienciaItem: number,
        descricao: string
    }];
    anoConcEnsMedio?: number;
    indSemEscola?: string;
    justEscola?: string;
    depAdmEscola?: string;
    escolasRecadDto?: {
        id: number;
        nomeEscola: string;
        dependAdm: string;
    }
}