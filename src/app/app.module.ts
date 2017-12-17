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
import { CardapiosPage } from '../pages/cardapios/cardapios';
import { SobrePage } from '../pages/sobre/sobre';
import { FazerpedidoPage } from '../pages/fazerpedido/fazerpedido';
import { CartPage } from '../pages/cart/cart';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LOCALE_ID } from '@angular/core';



@NgModule({
  declarations: [
    MyApp,
    RestaurantesPage,
    PedidosPage,
    MinhaContaPage,
    RedesSociaisPage,
    LoginPage,
    CadastroPage,
    CardapiosPage,
    SobrePage,
    FazerpedidoPage,
    CartPage
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
    CadastroPage,
    CardapiosPage,
    SobrePage,
    FazerpedidoPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}