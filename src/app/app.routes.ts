import { Routes } from '@angular/router';
import {ConfigurationComponent} from './components/configuration/configuration.component';
import {ConnectionsComponent} from './components/connections/connections.component';
import {DownloadsComponent} from './components/downloads/downloads.component';
import {DocumentationsComponent} from './components/documentations/documentations.component';

export const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'connections', component: ConnectionsComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'documentations', component: DocumentationsComponent },
];
