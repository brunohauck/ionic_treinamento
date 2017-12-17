import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//Alterado para carrinho
import { Http } from '@angular/http'
import { LoginPage } from '../login/login';
import { Cardapio } from '../../domain/cardapio/cardapio'
import { Cart } from '../../domain/cart/cart'
import { Pedido } from '../../domain/pedido/pedido'
import { RestaurantesPage } from '../restaurantes/restaurantes';
 


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public cardapio: Cardapio;
  public data;
  //Alterado para carrinho
  public http;
  public url: string;
  public cart: Cart;
  public valorTotal: number;
  public pedidos: Pedido[] = [];
  
  constructor(
    public navCtrl: NavController,
    public _alertCtrl: AlertController,
    http: Http, 
    public navParams: NavParams) {
	  this.cart = new Cart(null,null,null,null,null,null,null,null);
    this.http = http;
    this.data = {};
    this.data.response = '';
    this.url = "http://marmita.idsgeo.com/index.php/page/cadastrar_pedido_ionic_cart";
  }
  ngOnInit(){

    //this.pedido.usuario = new Usuario(sessionStorage.getItem('usuarioId'),"Bruno Hauck",sessionStorage.getItem('usuarioLogado'),null,null)
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }
    // Recupera o carrinho da sessão
    if(sessionStorage.getItem('cart')){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    else{      
      console.log("Carrinho vazio");
    } 
  }
  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  goToRestaurantes(){   
    this.navCtrl.setRoot(RestaurantesPage);
  }
  // Função para tratar incluir e excluir itens do carrinho
  private updateQuantity(index,amount){
    // se quantidade for maior que zero
  	if (this.cart.pedidos[index].quantidade + amount > 0) {
      // se for retirar ou incluir item do carrinho tem que alterar o valor total
      if(amount==-1){
        this.cart.valor_total = this.cart.valor_total*1 - this.cart.pedidos[index].cardapio.preco*1;
      }else{
        this.cart.valor_total = this.cart.valor_total*1 + this.cart.pedidos[index].cardapio.preco*1;
      }
      // Aumenta ou diminui a quantidade
      this.cart.pedidos[index].quantidade = this.cart.pedidos[index].quantidade + amount;
      // Grava o carrinho na sessão novamente
      sessionStorage.setItem("cart", JSON.stringify(this.cart));       
    } 
    else if (this.cart.pedidos[index].quantidade + amount === 0) {
      // se a quantidade for igual a zero retira o item do carrinho    
      this.cart.valor_total = this.cart.valor_total*1 - this.cart.pedidos[index].cardapio.preco*1; 
      this.cart.pedidos.splice(index, 1);
      // Grava o carrinho na sessão novamente
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }else {
  		return;
  	}
  }    
  increaseQuantity(index) {
    // função para adicionar item no carrinho
    this.updateQuantity(index,1);
  }
  decreaseQuantity(index) {
    // função para remover o item do carrinho
  	this.updateQuantity(index,-1);
  }
  
  checkout(){
    // função de checkout via http
    var data = JSON.stringify(this.cart);  
	  console.log(data)
    this.http.post(this.url, data)
      .subscribe(data => {
          this.data.response = data._body;
          this._alertCtrl
          .create({
            title: 'Sucesso',
            buttons: [{ text: 'OK' }],
            subTitle: this.data.response
          }).present();  
      }, error => {
          console.log("Oooops!");
          this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Estou ciente!' }],
            subTitle: 'Não foi possível salvar o pedido. Tente novamente.'
          }).present();
      });
  }
}
