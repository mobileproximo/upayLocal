import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { GestionPage } from './gestion.page';
import { MouvementPage } from './mouvement/mouvement.page';
import { ChangepinPage } from './changepin/changepin.page';
import { MescodesPage } from './mescodes/mescodes.page';
import { HistoriquePage } from './historique/historique.page';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: GestionPage
  },

  {
    path: 'mouvement',
    component: MouvementPage
  },
  {
    path: 'pin',
    component: ChangepinPage
  },
  {
    path: 'codes',
    component: MescodesPage
  },
    {
    path: 'historique',
    component: HistoriquePage
  }

];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GestionPage, MescodesPage, ChangepinPage, MouvementPage, HistoriquePage]
})
export class GestionPageModule {}
