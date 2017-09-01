import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //URL: 'http://marmita.idsgeo.com/index.php/page/login_ionic';
  constructor(public navCtrl: NavController) {
  }
  
}
