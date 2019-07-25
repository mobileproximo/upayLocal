import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobaleVariableService {
  public showPin = false;
public IMAGE_BASE_URL                 = 'assets/imgs/';

public BASEURL                    = 'http://196.207.207.63:8080/upayMobile/';
public IDPART                         = '';
public IDSESS                         = '';
public IDTERM                         = '';
public PIN                         = '';
public ISCONNECTED = true;
public HEADER: any     = {agence: '', montant: '0', numcompte: '', consomme: ''};
public HEADERTITELE                   = {title : '', src: ''};
public recu: any;
public notfound               = false;
public message                = '';
public dateUpdate               = '';
public minenlevement: any = 200000;
public listeImprimantes: any;
public statusImpriamte        = false;
public showRecu               = false;
public ShowPin                = true;
public modeTransactionnel     = false;
public liaisonreussie = false;
public DATEPAUSE;
public DATEREPRISE;
public READCODEOTP = '';
public PRENOM = '';
public NOM = '';
PHONE: any;
isLoadingShowing = false;
isErrorShowing = false;
  // tslint:disable-next-line: max-line-length
public OperatorsImages = [{codeoper: '0054', image: this.IMAGE_BASE_URL + 'emoney.png', sousop: ''}, {codeoper: '0025', image: this.IMAGE_BASE_URL + 'omoney.png', sousop: ''},
// tslint:disable-next-line: max-line-length
                          {codeoper: '0053', image: this.IMAGE_BASE_URL + 'postecash.png', sousop: ''}, {codeoper: '0022', image: this.IMAGE_BASE_URL + 'logo_Tigo Cash.png', sousop: ''},
// tslint:disable-next-line: max-line-length
                          {codeoper: '0057', image: this.IMAGE_BASE_URL + 'wizall.png', sousop: ''}, {codeoper: '0016', image: this.IMAGE_BASE_URL + 'sde.png', sousop: ''}, {codeoper: '0034', image: this.IMAGE_BASE_URL + 'logo_Expresso.png', sousop: ''},
// tslint:disable-next-line: max-line-length
                          {codeoper: '0027', image: this.IMAGE_BASE_URL + 'Petite-Icon-24.png', sousop: ''}, {codeoper: '0029', image: this.IMAGE_BASE_URL + 'woyofal.png', sousop: ''}, {codeoper: '0020', image: this.IMAGE_BASE_URL + 'tigo.png', sousop: ''},
// tslint:disable-next-line: max-line-length
                          {codeoper: '0005', image: this.IMAGE_BASE_URL + 'logo_Orange.png', sousop: ''}, {codeoper: '0057', image: this.IMAGE_BASE_URL + 'logo_rapido.png', sousop: '0002'}, {codeoper: '0052', image: this.IMAGE_BASE_URL + 'logo_Proxicash.png', sousop: ''},
                        ];
public MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  constructor() { }
}
