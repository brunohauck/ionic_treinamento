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
    console.log(sessionStorage.getItem('usuarioId'));
    console.log(sessionStorage.getItem('usuarioLogado'));
    //this.pedido.usuario = new Usuario(sessionStorage.getItem('usuarioId'),"Bruno Hauck",sessionStorage.getItem('usuarioLogado'),null,null)
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }
    if(sessionStorage.getItem('cart')){
      //console.log(sessionStorage.getItem('cart'))
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
  checkout(){
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
