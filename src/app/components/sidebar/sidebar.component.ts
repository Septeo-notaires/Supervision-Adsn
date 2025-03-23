import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { }
