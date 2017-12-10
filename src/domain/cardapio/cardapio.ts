export class Cardapio{
    constructor(
        public id: string,
        public nome: string,
        public ingredientes: string,
        public preco: number,
        public imgurl: string
    ){}
}