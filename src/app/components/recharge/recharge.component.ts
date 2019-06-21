import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { FormatphonePipe } from 'src/app/pipes/formatphone.pipe';

@Component({
  selector: 'recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {

  public rechargeForm: FormGroup;
  @Input() datarecharge: any = {};
  label: string;
  dataForPin: any = {};


  ngOnInit() {}


  constructor( public formatphone: FormatphonePipe,
               public millier: MillierPipe, public formbuilder: FormBuilder,
               public serv: ServiceService, public glb: GlobaleVariableService) {
    this.rechargeForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montant: ['', Validators.required],
      oper: [''],
      pin: [''],

    });
    this.glb.modeTransactionnel = false;
  }
  changetel() {
    console.log('change');
    this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/ /g, ''));
    this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/-/g, ''));
    if (this.rechargeForm.controls.telephone.value.length > 9) {
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.substring(0, 9));
    }
  }
  changemontant() {

      if (this.rechargeForm.controls.montant.value) {
        this.rechargeForm.controls.montant.setValue(this.rechargeForm.controls.montant.value.replace(/ /g, ''));
        this.rechargeForm.controls.montant.setValue(this.rechargeForm.controls.montant.value.replace(/-/g, ''));
        this.rechargeForm.controls.montant.setValue(this.millier.transform(this.rechargeForm.controls.montant.value));

      }

  }
  focustel() {
    console.log('focus');
    if (this.rechargeForm.controls.telephone.value) {
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/ /g, ''));
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/-/g, ''));

    }
  }
  blurtel() {

   this.rechargeForm.controls.telephone.setValue(this.formatphone.transform(this.rechargeForm.controls.telephone.value));

  }
  recharger() {
      this.rechargeForm.controls.oper.setValue(this.datarecharge.oper);
      this.dataForPin = this.datarecharge;
      this.dataForPin.telephone = this.rechargeForm.getRawValue().telephone;
      this.dataForPin.montant = this.rechargeForm.getRawValue().montant;
      this.dataForPin.label = 'Téléphone';
      this.glb.modeTransactionnel = true;
      this.glb.ShowPin = true;

  }
  eventCapture(codePin: any) {
    if (this.glb.modeTransactionnel) {
      const data: any = {};
      data.recharge = this.rechargeForm.getRawValue();
      data.image = this.datarecharge.image;
      data.operation = this.datarecharge.operation;
      data.operateur = this.datarecharge.operateur;
      data.recharge.pin = codePin;
      this.serv.recharger(data);
    }
    this.glb.ShowPin = false;
  }



}
