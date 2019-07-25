import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-contact',
  templateUrl: './popover-contact.component.html',
  styleUrls: ['./popover-contact.component.scss'],
})
export class PopoverContactComponent implements OnInit {
  listphones: any;
  constructor(public nav: NavParams,
              public popover: PopoverController) { }

  ngOnInit() {
    console.log(JSON.stringify(this.nav.data.phones));
    this.listphones = this.nav.data.phones;
  }
 async dismiss(phone) {
    await this.popover.dismiss(phone);
  }
}
