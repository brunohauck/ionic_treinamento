import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Restaurante } from '../../domain/restaurante/restaurante';
import { Http } from '@angular/http';
import { CardapiosPage } from '../cardapios/cardapios';


@Component({
  selector: 'page-restaurantes',
  templateUrl: 'restaurantes.html'
})
export class RestaurantesPage {

  searchTerm: string = '';	
  public restaurantes: Restaurante[];
  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController ) { }
  
  ngOnInit(){
	this.requestHttpRestaurantes();
  }
  requestHttpRestaurantes(){
	let loader = this._loadingCtrl.create({
      content: 'Listando restaurantes. Aguarde ...'
    });
    //http://192.168.254.9/pedidos/restaurante/get_restaurante
    //http://marmita.idsgeo.com/index.php/page/get_ionic
    loader.present();
    this._http
      .get('http://marmita.idsgeo.com/index.php/page/get_ionic')
      .map(res => res.json())
      .toPromise()
      .then(restaurates => {
        this.restaurantes = restaurates;
        loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        loader.dismiss();
        this._alertCtrl
        .create({
          title: 'Falha na conexão',
          buttons: [{ text: 'Estou ciente!' }],
          subTitle: 'Não foi possível obter a lista de restaurantes. Tente novamente.'
        }).present();
      });
  } 
     
  seleciona(restaurante){
    console.log('Entrou na Action seleciona');
    this.navCtrl.setRoot(CardapiosPage, { restauranteSelecionado: restaurante });
  }
  setFilteredItems() { 
	this.restaurantes = this.filterItems(this.searchTerm);	
  }  
  filterItems(searchTerm){
	if (searchTerm && searchTerm.trim() != '') {  
		return this.restaurantes.filter((restaurante: any) => {
			return restaurante.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});    
	}else{
		this.requestHttpRestaurantes();
	}	
  }

}
