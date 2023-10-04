import { Aluno } from "./Aluno"
import { ConfigRecad } from "./ConfigRecad"

export class PedidoRecad {
    id?:number
    configRecad?: ConfigRecad
    aluno?: Aluno
    email?: string 
    dtInclusaoPedido?: string
    situacaoPedido?: string
    codigoVerificacao?: string
    indVerificado?: string
    codOperador?: string
    dtAlteracao?: string
    hrAlteracao?: string
    enderecoFisico?: string
    concorrencia?: string
}