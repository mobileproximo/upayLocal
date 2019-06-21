import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'recharge', loadChildren: './pages/recharge/recharge.module#RechargePageModule' },
  { path: 'monnaie', loadChildren: './pages/monnaie/monnaie.module#MonnaiePageModule' },
  { path: 'paiement', loadChildren: './pages/paiement/paiement.module#PaiementPageModule' },
  { path: 'connexion', loadChildren: './pages/connexion/connexion.module#ConnexionPageModule' },
  { path: 'transfert', loadChildren: './pages/transfert/transfert.module#TransfertPageModule' },
  { path: 'gestion', loadChildren: './pages/gestion/gestion.module#GestionPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
