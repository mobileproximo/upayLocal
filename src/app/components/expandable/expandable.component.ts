import { Component, OnInit, ViewChild, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded: any;
  @Input('expandHeight') expandHeight;

  constructor(public renderer: Renderer) {
  }

  ngAfterViewInit(){
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
  }


  ngOnInit() {}

}
