import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceService } from './service/service.service';
import { GlobaleVariableService } from './service/globale-variable.service';
import { MillierPipe } from './pipes/millier.pipe';
import { Toast } from '@ionic-native/toast/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Sim } from '@ionic-native/sim/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FormatphonePipe } from './pipes/formatphone.pipe';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FormatdatePipe } from './pipes/formatdate.pipe';
import { FormatcodePipe } from './pipes/formatcode.pipe';
import { CoupurechainePipe } from './pipes/coupurechaine.pipe';
import { OperatorImagePipe } from './pipes/operator-image.pipe';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
  declarations: [AppComponent, FormatdatePipe,  CoupurechainePipe, OperatorImagePipe],
  imports: [BrowserModule,  IonicModule.forRoot(), AppRoutingModule,  IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceService,
    Contacts,
    Sim, MillierPipe, FormatphonePipe, AndroidPermissions,  FormatdatePipe, CoupurechainePipe, BarcodeScanner,
    GlobaleVariableService, Toast,  HTTP, OneSignal, Network, OperatorImagePipe, FormatcodePipe, CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
enableProdMode();
