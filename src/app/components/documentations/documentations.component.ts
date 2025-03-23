import { Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-documentations',
  templateUrl: './documentations.component.html',
  styleUrls: ['./documentations.component.css'],
  imports: [NgClass]
})
export class DocumentationsComponent {
  item1 = { visible: false };
  item2 = { visible: false };
  item3 = { visible: false };
  item4 = { visible: false };
  item5 = { visible: false };
  item6 = { visible: false };

  toggleContent(item: any) {
    item.visible = !item.visible;
  }
}
