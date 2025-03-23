import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  files = [
    { name: 'dxsapi_1.4.3.0.msi', url: 'assets/docs/dxsapi_1.4.3.0.msi' },
    { name: 'dxsapi_64_1.4.3.0.msi', url: 'assets/docs/dxsapi_64_1.4.3.0.msi' },
    { name: 'DXSProfils-ref-2.6.1.0-x64.exe', url: 'assets/docs/DXSProfils-ref-2.6.1.0-x64.exe' },
    { name: 'DXSProfils-ref-2.6.1.0-x86.exe', url: 'assets/docs/DXSProfils-ref-2.6.1.0-x86.exe' },
    { name: 'REAL.NOT.AWRConfInstaller-1.0.4.7-x64.msi', url: 'assets/docs/REAL.NOT.AWRConfInstaller-1.0.4.7-x64.msi' },
    { name: 'REAL.NOT.AWRInstaller-3.2.6.0-x64.msi', url: 'assets/docs/REAL.NOT.AWRInstaller-3.2.6.0-x64.msi' },
    { name: 'REF NOTAIRES DE FRANCE 2037.crt', url: 'assets/docs/REF%20NOTAIRES%20DE%20FRANCE%202037.crt' },
    { name: 'REF REALSSL 2029.crt', url: 'assets/docs/REF%20REALSSL%202029.crt' }
  ];


}
