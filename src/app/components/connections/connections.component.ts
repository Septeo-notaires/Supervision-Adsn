import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {OsService} from '../../services/os.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  imports: [
    NgClass,
    NgForOf
  ],
})
export class ConnectionsComponent implements OnInit, OnDestroy {
  ip: string = '172.30.100.100';
  port: number = 8080;
  lastCheckTime: string = '';

  connectionStatus2: string = '';
  ip2: string = '10.20.250.71';
  port2: number = 389;
  lastCheckTime2: string = '';

  connectionStatus: string = '';

  private intervalId: any;

  services = [
    'AvisOpere',
    'AvisReception',
    'ExtraitCompte',
    'Habilitation',
    'ValidationVirementMulti',
    'ValidationVirement',
    'ClotureAffaire',
    'EtatClotAffaire',
    'OuvertureCompte',
    'EtatOuvertureCompte'
  ];

  urlsToCheck = [
    'http://recproj-awr-edi.cdc-net.com/services/AvisOpere',
    'http://recproj-awr-edi.cdc-net.com/services/AvisReception',
    'http://recproj-awr-edi.cdc-net.com/services/ExtraitCompte',
    'http://recproj-awr-edi.cdc-net.com/services/Habilitation',
    'http://recproj-awr-edi.cdc-net.com/services/ValidationVirementMulti',
    'http://recproj-awr-edi.cdc-net.com/services/ValidationVirement',
    'http://recproj-awr-edi.cdc-net.com/services/ClotureAffaire',
    'http://recproj-awr-edi.cdc-net.com/services/EtatClotAffaire',
    'http://recproj-awr-edi.cdc-net.com/services/OuvertureCompte',
    'http://recproj-awr-edi.cdc-net.com/services/EtatOuvertureCompte'
  ];

  urlStatuses: { [key: string]: string } = {};

  async checkUrls() {
    this.urlsToCheck.forEach(async (url) => {
      this.urlStatuses[url] = 'Vérification en cours...';

      try {
        const response = await fetch(url, { method: 'GET' });

        if (response.status === 200) {
          this.urlStatuses[url] = '✅ Accessible (200)';
        } else {
          this.urlStatuses[url] = `❌ Erreur (Status: ${response.status})`;
        }
      } catch (error) {
        this.urlStatuses[url] = '❌ Erreur de connexion';
        console.error(`Erreur lors de la vérification de ${url}:`, error);
      }
    });
  }

  constructor(private osService: OsService) {}

  ngOnInit(): void {
    this.checkTelnetConnection();
    this.checkTelnetConnection2();

    this.checkUrls();

    this.intervalId = setInterval(() => {
      this.checkTelnetConnection();
      this.checkTelnetConnection2();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async checkTelnetConnection() {
    this.connectionStatus = 'Connexion en cours...';

    try {
      const isConnected = await this.osService.telnetCommand(this.ip, this.port);
      this.connectionStatus = isConnected ? '✅ Connexion réussie !' : '❌ Connexion échouée.';
    } catch (error) {
      this.connectionStatus = '❌ Erreur lors de la connexion.';
      console.error('Erreur Telnet:', error);
    }

    this.lastCheckTime = new Date().toLocaleTimeString();
  }

  async checkTelnetConnection2() {
    this.connectionStatus2 = 'Connexion en cours...';

    try {
      const isConnected = await this.osService.telnetCommand(this.ip2, this.port2);
      this.connectionStatus2 = isConnected ? '✅ Connexion réussie !' : '❌ Connexion échouée.';
    } catch (error) {
      this.connectionStatus2 = '❌ Erreur lors de la connexion.';
      console.error('Erreur Telnet:', error);
    }

    this.lastCheckTime2 = new Date().toLocaleTimeString();
  }
}
