import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Cart } from '../../domain/cart/cart';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html'
})
export class PedidosPage {


    public url: string;
    public carts: Cart[];
     constructor(
         public navCtrl: NavController,
         private _http: Http,
         private _loadingCtrl: LoadingController,
         private _alertCtrl: AlertController,
         public navParams: NavParams
     ){
        //this.url = "http://marmita.idsgeo.com/index.php/page/get_ionic_pedidos_json/"+sessionStorage.getItem('usuarioId');
        this.url = "http://marmita.idsgeo.com/index.php/page/get_ionic_cart_json/"+sessionStorage.getItem('usuarioId');
     }
     ngOnInit(){

          
        if(sessionStorage.getItem('flagLogado')!="sim"){
          this.goToLogin();
        }
        let loader = this._loadingCtrl.create({
            content: 'Buscando pedidos. Aguarde...'
        });
        loader.present();
        this._http
            .get(this.url)
            .map( res => res.json())
            .toPromise()
            .then( carts => {
                this.carts = carts;
                loader.dismiss();
            })
            .catch(err =>{
                console.log(err);
                loader.dismiss();
                this._alertCtrl
                    .create({
                        title: 'Falha na conexão',
                        buttons: [{ text: 'OK estou ciente!'}],
                        subTitle: "Não foi possível obter o cardapio. Tente mais tarde."
                    }).present();
            });
     }
    
    goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  
}
