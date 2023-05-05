import { Component, Input } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-grid-pager',
  templateUrl: './grid-pager.component.html',
  styleUrls: ['./grid-pager.component.css']
})
export class GridPagerComponent {

  @Input()total : number;
  @Input()selected : number;

}
