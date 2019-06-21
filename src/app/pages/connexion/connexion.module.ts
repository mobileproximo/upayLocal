import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConnexionPage } from './connexion.page';
;
import { CodeOTPPage } from './code-otp/code-otp.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ConnexionPage
  },
  {
    path: 'codeotp',
    component: CodeOTPPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConnexionPage, CodeOTPPage]
})
export class ConnexionPageModule {}
