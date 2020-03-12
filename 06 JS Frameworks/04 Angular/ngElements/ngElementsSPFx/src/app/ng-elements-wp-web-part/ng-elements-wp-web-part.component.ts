import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ng-elements-wp-web-part',
  templateUrl: './ng-elements-wp-web-part.component.html',
  styleUrls: ['./ng-elements-wp-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NgElementsWpWebPartComponent implements OnInit {
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
