import { Cardapio } from '../../domain/cardapio/cardapio'

export class Pedido{
    constructor(
        public cardapio: Cardapio,
        public quantidade: number
    ){}
}