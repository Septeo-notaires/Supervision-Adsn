import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    FormsModule,
    SidebarComponent,
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {}
