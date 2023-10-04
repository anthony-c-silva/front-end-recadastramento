import { TabEstruturada } from "../tabEstruturada/TabEstruturada";

export class DadosEnderecoDto {
    idConfigRecad?: number;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: {
        id: number;
        nome: string;
        uf: string;
    };
    estadoDto?: TabEstruturada;
}