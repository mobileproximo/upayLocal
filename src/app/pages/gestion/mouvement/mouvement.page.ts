import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.page.html',
  styleUrls: ['./mouvement.page.scss'],
})
export class MouvementPage implements OnInit {
  critere: FormGroup;
  showdetails: boolean;
  operations: any;
  minDate: string;
  constructor(public glb: GlobaleVariableService, public formbuilder: FormBuilder,
              public serv: ServiceService ) {
    this.critere = this.formbuilder.group({
      date1: ['', Validators.required],
      date2: ['', Validators.required],
      bank: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-06.png';
    this.glb.HEADERTITELE.title = 'Etat mouvements';
    this.critere.controls.bank.setValue('tous');
  }
  listermvt() {
    this.showdetails = false;
    const parametre: any = this.critere.getRawValue();
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    const date1 = parametre.date1.substring(0, parametre.date1.indexOf('T'));
    const date2 = parametre.date2.substring(0, parametre.date2.indexOf('T'));
    parametre.date1 = date1 + ' 00:00:00';
    parametre.date2 = date2 + ' 23:59:59';
    console.log(JSON.stringify(parametre));
    this.serv.afficheloading();
    this.serv.posts('compte/etamvt.php', parametre, {}).then(data => {
          this.serv.dismissloadin();
          const reponse = JSON.parse(data.data);
          //alert(JSON.stringify(reponse));
          if (reponse.returnCode === '0') {
            this.showdetails = true;
            if (reponse.Operations.Operation.length) {
              this.operations = reponse.Operations.Operation;
            } else {
              this.operations = [];
              this.operations[0] = reponse.Operations.Operation;
            }
// tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.operations.length; i++) {
             this.operations[i].image = this.glb.IMAGE_BASE_URL + 'logo_upay.jpg';
            }
          } else { this.serv.showError(reponse.errorLabel); }


        }).catch(err => {
          this.serv.dismissloadin();
          this.serv.showError('Impossible d\'atteindre le serveur');
        });


      }
      changedatedeb() {
        this.showdetails = false;
        const datedeb = this.critere.controls.date1.value;
        console.log(datedeb);
        const date = new Date(datedeb);
        console.log(date);
        this.minDate = date.toISOString();
        console.log(this.critere.controls.date1.value);
        this.critere.controls.date2.setValue('');
      }
      changefin() {
        this.showdetails = false;
      }


}
