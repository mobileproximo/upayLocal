import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransfertPage } from './transfert.page';
import { RiaPage } from './ria/ria.page';
import { ProxicashPage } from './proxicash/proxicash.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TransfertPage
  },
  {
    path: 'ria',
    component: RiaPage
  },
  {
    path: 'proxicash',
    component: ProxicashPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransfertPage, RiaPage, ProxicashPage]
})
export class TransfertPageModule {}
