import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonnaiePage } from './monnaie.page';
import { OrangeMoneyPage } from './orange-money/orange-money.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { WizallPage } from './wizall/wizall.page';
import { EmoneyPage } from './emoney/emoney.page';
import { PostcashPage } from './postcash/postcash.page';
import { TigocashPage } from './tigocash/tigocash.page';
import { UpayWalletPage } from './upay-wallet/upay-wallet.page';
import { TransfertUniteValeurPage } from './transfert-unite-valeur/transfert-unite-valeur.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

const routes: Routes = [
  {
    path: '',
    component: MonnaiePage
  },
  {
    path: 'orange-money',
    component: OrangeMoneyPage
  },
  {
    path: 'wizall',
    component: WizallPage
  }
  ,
  {
    path: 'emoney',
    component: EmoneyPage
  },
  {
    path: 'postcash',
    component: PostcashPage
  },
  {
    path: 'tigocash',
    component: TigocashPage
  },
  {
    path: 'upaywallet',
    component: UpayWalletPage
  },
  {
    path: 'transfertuv',
    component: TransfertUniteValeurPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes), NgxQRCodeModule
  ],
  declarations: [MonnaiePage, OrangeMoneyPage, EmoneyPage, PostcashPage, WizallPage, TigocashPage, UpayWalletPage, TransfertUniteValeurPage]
})
export class MonnaiePageModule {}
