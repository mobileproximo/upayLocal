import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { FormatdatePipe } from 'src/app/pipes/formatdate.pipe';
import { OperatorImagePipe } from 'src/app/pipes/operator-image.pipe';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  public showdetails = false;
  public all = false;
  public existewoyofal = false;
  public transactions: any;
  public criterForm: FormGroup;
  public minDate: any;
  public mnttotal: any;
  constructor(public glb: GlobaleVariableService, public serv: ServiceService,
              public formBuilder: FormBuilder, public monmillier: MillierPipe,
              public formatdate: FormatdatePipe,
              public operatorImage: OperatorImagePipe
              ) {
    this.criterForm = formBuilder.group({
      date1: ['', Validators.required],
      date2: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-06.png';
    this.glb.HEADERTITELE.title = 'Historique transactions';
  }
  changedatedeb() {
    this.showdetails = false;
    const datedeb = this.criterForm.controls.date1.value;
    console.log(datedeb);
    const date = new Date(datedeb);
    console.log(date);
    this.minDate = date.toISOString();
    console.log(this.criterForm.controls.date1.value);
    this.criterForm.controls.date2.setValue('');
  }

  changefin() {
    this.showdetails = false;
  }
  listerhisto(mode) {
    this.showdetails = false;
    const parametre: any = this.criterForm.getRawValue();
    const date1 = parametre.date1.substring(0, parametre.date1.indexOf('T'));
    const date2 = parametre.date2.substring(0, parametre.date2.indexOf('T'));
    parametre.date1 = date1 + ' 00:00:00';
    parametre.date2 = date2 + ' 23:59:59';
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    const url = mode === 'all' ? 'transaction/histotrx.php' : 'transaction/getlasttrx.php';
    this.all = mode === 'all' ? true : false;
    console.log('parametre ' + JSON.stringify(parametre));

    this.serv.afficheloading();
    this.serv.posts(url, parametre, {}).then(data => {
      this.serv.dismissloadin();
      const reponse: any = JSON.parse(data.data);
     // alert(JSON.stringify(reponse));
      if (reponse.returnCode === '0') {
        this.showdetails = true;
        if (mode === 'all') {
          if (reponse.Transactions.Transaction.length) {
            this.transactions = reponse.Transactions.Transaction;
          } else {
            this.transactions = [];
            this.transactions[0] = reponse.Transactions.Transaction;
          }
          this.mnttotal = 0;
// tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.transactions.length; i++) {
            const sousop = this.transactions[i].codesousop;
            const codeoper = this.transactions[i].codeOper;
            this.transactions[i].image = this.operatorImage.transform(this.glb.OperatorsImages, codeoper, sousop);

           // this.mnttotal = this.mnttotal * 1 + this.transactions[i].Montant * 1;

          }
        } else {

          if (reponse.Trxs.Trx.length) {
            this.transactions = reponse.Trxs.Trx;

          } else {
            this.transactions = [];
            this.transactions[0] = reponse.Trxs.Trx;
          }
          this.existewoyofal = false;

// tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.transactions.length; j++) {
            this.transactions[j].Dtrx = this.formatdate.transform(this.transactions[j].Dtrx);
           // this.transactions[j].Oper = this.serv.getSoup(this.transactions[j].Oper, this.transactions[j].Soper);
            if (this.transactions[j].Oper === 'Woyofal') {
              this.existewoyofal = true;
            }
            if (typeof (this.transactions[j].codesousop) === 'object') {
              this.transactions[j].codesousop = '';
            }
            const sousop = this.transactions[j].codesousop;
            const codeoper = this.transactions[j].codeOper;
            if (codeoper === '0029') {
            this.transactions[j].Numc = this.transactions[j].IdDes;
            }
            if (typeof (this.transactions[j].Numc) === 'object') {
              this.transactions[j].Numc = '';
            }

            this.transactions[j].label = this.serv.getLabelOperator(codeoper, sousop);
            this.transactions[j].datetrx = this.formatdate.transform(this.transactions[j].Dtrx);
            this.transactions[j].image = this.operatorImage.transform(this.glb.OperatorsImages, codeoper, sousop);
          }
        }
      } else { this.serv.showError(reponse.errorLabel); }

    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur ');
    });
  }
}
