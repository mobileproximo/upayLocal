import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PaiementPage } from './paiement.page';
import { SenelecPage } from './senelec/senelec.page';
import { SdePage } from './sde/sde.page';
import { WoyofalPage } from './woyofal/woyofal.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: PaiementPage
  },
  {
    path: 'senelec',
    component: SenelecPage
  },
  {
    path: 'sde',
    component: SdePage
  },
  {
    path: 'woyofal',
    component: WoyofalPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaiementPage, SenelecPage, SdePage, WoyofalPage]
})
export class PaiementPageModule {}
