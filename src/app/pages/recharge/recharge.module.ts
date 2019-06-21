import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RechargePage } from './recharge.page';
import { OrangePage } from './orange/orange.page';
import { IziPage } from './izi/izi.page';
import { YakalmaPage } from './yakalma/yakalma.page';
import { RapidoPage } from './rapido/rapido.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RechargeComponent } from 'src/app/components/recharge/recharge.component';


const routes: Routes = [
  {
    path: '',
    component: RechargePage
  },
  {
    path: 'orange',
    component: OrangePage
  },
  {
    path: 'izi',
    component: IziPage
  },
  {
    path: 'yakalma',
    component: YakalmaPage
  },
  {
    path: 'rapido',
    component: RapidoPage,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RechargePage, OrangePage, RapidoPage, IziPage, YakalmaPage]
})
export class RechargePageModule {}
