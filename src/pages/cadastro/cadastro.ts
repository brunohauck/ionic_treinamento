import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Usuario } from '../../domain/usuario/usuario';
import { RestaurantesPage } from '../restaurantes/restaurantes'

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public data;
  public http;
  public usuario: Usuario;
  constructor(
      public navCtrl: NavController,
      http: Http ) {

        this.data = {};
        this.data.response = '';
        this.http = http;
        this.usuario = new Usuario (null, null, null, null, null);
  }

  submit(){
    var link = 'http://marmita.idsgeo.com/index.php/page/cadastrar_usuario_ionic';
    var data = JSON.stringify({ nome: this.usuario.nome, email: this.usuario.email, password: this.usuario.password });
    
    // Iniciando a conexão HTTP para cadastro via JSON
    this.http.post(link, data)
      .subscribe( data => {
        this.data.response = data._body;
        if(this.data.response == "sucesso"){
          this.navCtrl.push(RestaurantesPage)
          
        }

      }, error =>{
        console.log("Ocorreu algum erro!");
      });

  }
  
}
