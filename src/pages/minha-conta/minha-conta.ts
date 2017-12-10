import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html'
})
export class MinhaContaPage {

  constructor(public navCtrl: NavController) {
  }

  goToCadastro(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CadastroPage);
  } 
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }

  
}
