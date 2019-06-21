import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent implements OnInit {

  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {}

}
