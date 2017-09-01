import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RestaurantesPage } from '../pages/restaurantes/restaurantes';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { RedesSociaisPage } from '../pages/redes-sociais/redes-sociais';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    RestaurantesPage,
    PedidosPage,
    MinhaContaPage,
    RedesSociaisPage,
    LoginPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RestaurantesPage,
    PedidosPage,
    MinhaContaPage,
    RedesSociaisPage,
    LoginPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}