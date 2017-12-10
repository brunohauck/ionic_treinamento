import { Pedido } from '../../domain/pedido/pedido'

export class Cart{
    constructor(
        public id: string,
        public pedidos: Pedido[],
        public usuario: string,
        public valor_total: number,
        public taxa_entrega: number,
        public nome: string,
        public email: string,
        public observacao: string
    ){}
}