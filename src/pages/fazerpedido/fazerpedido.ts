import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//Alterado para carrinho
import { Http } from '@angular/http'
import { LoginPage } from '../login/login';
import { Cardapio } from '../../domain/cardapio/cardapio'
import { Cart } from '../../domain/cart/cart'
import { Pedido } from '../../domain/pedido/pedido'
import { RestaurantesPage } from '../restaurantes/restaurantes';
import { CartPage } from '../cart/cart';
 
/**
 * Generated class for the FazerpedidoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-fazerpedido',
  templateUrl: 'fazerpedido.html',
})
export class FazerpedidoPage {

  public cardapio: Cardapio;
  public data;
  //Alterado para carrinho
  public http;
  public url: string;
  public pedido: Pedido;
  public cart: Cart;
  public pedidos: Pedido[] = [];
  
  constructor(
    public navCtrl: NavController,
    public _alertCtrl: AlertController,
    http: Http, 
    public navParams: NavParams) {
    
	//Alterado para carrinho
    this.pedido = new Pedido(null,null);
	  this.cart = new Cart(null,null,null,null,null,null,null,null);
    this.pedido.cardapio = this.navParams.get('cardapioSelecionado');
    this.http = http;
    this.data = {};
    this.data.response = '';
    this.url = "http://marmita.idsgeo.com/index.php/page/cadastrar_pedido_ionic";
  }
  ngOnInit(){
    // Verifica se usuário está logado
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }
  }
  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  goToRestaurantes(){   
    this.navCtrl.setRoot(RestaurantesPage);
  }
  clearCart(){
    sessionStorage.setItem('cart', null);
  }
  addCart(){
   if(sessionStorage.getItem('cart')){
     console.log(sessionStorage.getItem('cart'))
     this.cart = JSON.parse(sessionStorage.getItem('cart'));
     //Zera o carrinho se ele estiver vazio
     console.log(this.pedidos.length)
     if(!this.pedidos){
       console.log("entrou no if ==0")
        this.cart = new Cart(null,null,null,null,null,null,null,null);
     }
   }
   else{
     console.log("Carrinho vazio");
   } 
   //Adicionando primeiro item ao carrinho
	if(this.cart.pedidos==null || this.cart.pedidos.length == 0){ 
    this.pedido.quantidade = 1;
		this.pedidos[0] = this.pedido;
		this.cart.pedidos = this.pedidos;
		this.cart.valor_total = this.pedido.cardapio.preco;
		this.cart.taxa_entrega = 10.50;
		this.cart.usuario = sessionStorage.getItem('usuarioId');
		this.cart.email = sessionStorage.getItem('usuarioLogado');
		sessionStorage.setItem("cart", JSON.stringify(this.cart));
	}else
	if(this.cart.pedidos.length>0){
    // Adicionando segundo item ao carrinho
    let flag=true;
    // Verificando se está repetido
		this.cart.pedidos.forEach((cardapio) => {
            console.log(cardapio);
			if(cardapio.cardapio.id == this.pedido.cardapio.id){
				console.log("pedido já se encontra no carrinho");
				flag=false;
			}
    });
		// Caso não seja repetido insere novo item ao carrinho
		if(flag){
      this.pedido.quantidade = 1;
			let arrayIndex = this.cart.pedidos.length;
			this.cart.valor_total = this.cart.valor_total*1 + this.pedido.cardapio.preco*1;
			this.cart.pedidos[arrayIndex] = this.pedido;
			sessionStorage.setItem("cart", JSON.stringify(this.cart));
		}	
		console.log(sessionStorage.getItem('cart'))
  }
  this.navCtrl.setRoot(CartPage);
  }
}
