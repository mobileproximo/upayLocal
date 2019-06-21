import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderTitleComponent } from '../components/header-title/header-title.component';
import { ScrollComponent } from '../scroll/scroll.component';
import { RechargeComponent } from '../components/recharge/recharge.component';
import { CashinAvecReleveComponent } from '../components/cashin-avec-releve/cashin-avec-releve.component';
import { RecuRechargeComponent } from '../components/recu-recharge/recu-recharge.component';
import { MillierPipe } from '../pipes/millier.pipe';
import { FormatphonePipe } from '../pipes/formatphone.pipe';
import { CodepinComponent } from '../components/codepin/codepin.component';
import { EnvoiComponent } from '../components/envoi/envoi.component';
import { RecuTransfertComponent } from '../components/recu-transfert/recu-transfert.component';
import { RecuWoyofalComponent } from '../components/recu-woyofal/recu-woyofal.component';
import { RecuEncaissementComponent } from '../components/recu-encaissement/recu-encaissement.component';
import { ReceptionComponent } from '../components/reception/reception.component';
import { FormatcodePipe } from '../pipes/formatcode.pipe';

@NgModule({
  declarations: [HeaderComponent, HeaderTitleComponent, FormatphonePipe,
                ScrollComponent, RechargeComponent, MillierPipe, FormatcodePipe,
                CashinAvecReleveComponent, RecuRechargeComponent, ReceptionComponent,
                CodepinComponent, EnvoiComponent, RecuTransfertComponent, RecuWoyofalComponent, RecuEncaissementComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule,
  ],
  exports: [HeaderComponent,
            HeaderTitleComponent,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            IonicModule, ScrollComponent, FormatphonePipe, ReceptionComponent, FormatcodePipe,
            RechargeComponent, CashinAvecReleveComponent, MillierPipe, RecuWoyofalComponent, RecuEncaissementComponent,
            RecuRechargeComponent, CodepinComponent, EnvoiComponent, RecuTransfertComponent]
})
export class SharedModule { }
