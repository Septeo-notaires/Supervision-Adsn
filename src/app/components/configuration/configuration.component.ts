import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { OsService } from '../../services/os.service';
import {ConfigurationBlockComponent} from '../configuration-block/configuration-block.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  imports: [AsyncPipe, NgIf, NgClass, ConfigurationBlockComponent],
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  proxyStatus$: Promise<boolean>;
  addressProxyServer$: Promise<string>;
  proxyExceptions$: Promise<string[]>;
  customConfiguration$: Promise<string>;
  securedUrls$: Promise<string>;
  hostsConfig$: Promise<string>;

  isSuccess = false;
  isProxyExceptionsSuccess = false;
  isCustomConfigurationSuccess = false;
  isSecuredUrlsSuccess = false;

  constructor(private osService: OsService) {
    this.proxyStatus$ = this.osService.isProxiesEnabled();
    this.addressProxyServer$ = this.osService.addressProxyServer();
    this.proxyExceptions$ = this.osService.getProxyExceptions();
    this.customConfiguration$ = this.osService.readCustomConfiguration();
    this.securedUrls$ = this.osService.readSecuredUrls();
    this.hostsConfig$ = this.osService.readHosts();
  }

  async ngOnInit() {

    try {
      const addressProxyServerValue = await this.addressProxyServer$;
      this.isSuccess = await this.compare(this.rightProxyConfiguration, addressProxyServerValue);

      const proxyExceptions = await this.proxyExceptions$;
      this.isProxyExceptionsSuccess = await this.compare(this.rightProxyExceptions, proxyExceptions.join());

      const customConfiguration = await this.customConfiguration$;
      this.isCustomConfigurationSuccess = await this.compare(this.rightAwrConfig, customConfiguration);

      const securedUrls = await this.securedUrls$;
      this.isSecuredUrlsSuccess = await this.compare(this.rightSecuredUrls, securedUrls);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse du serveur proxy:', error);
    }
  }

  async compare(value: string, valuee: string): Promise<boolean> {
    return value.replace(/\r\n|\r/g, '\n').trim() === valuee.replace(/\r\n|\r/g, '\n').trim();
  }

  onApplyConfig() {
    console.log("L'événement 'applyConfig' a été déclenché !");
  }

  rightProxyConfiguration: string = 'http=127.0.0.1:64000';
  rightProxyExceptions: string = '10.20.250.1,eval-ecv.real.notaires.fr,eva-casierjudiciaire-bo.real.notaires.fr,eva-casierjudiciaire.real.notaires.fr,micen.real.notaires.fr,client-ecaase.real.notaires.fr,micen-services.real.notaires.fr,micen-upload.real.notaires.fr,micen-portail.real.notaires.fr,eval-anf-stock.notaires.fr,micen-test.real.notaires.fr,client-ecaase-test.real.notaires.fr,rmn.real.notaires.fr,planete.notaires.fr,eva-planete.real.notaires.fr,eva-micen-portail.real.notaires.fr,eva-micen-services.real.notaires.fr,eva-micen-upload.real.notaires.fr,eva-cgu.real.notaires.fr';
  rightAwrConfig: string = `<?xml version="1.0"?>
<Configuration xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Mode="INIT" ModeConf="FALSE">
  <Proxy>
    <ProxyListeningPort>64000</ProxyListeningPort>
    <RelayProxy>
      <Host>proxy.notaires.fr</Host>
      <Port>8080</Port>
      <Exceptions>eva-planete.real.notaires.fr;eva-micen-public.real.notaires.fr;eva-micen-portail.real.notaires.fr;eva-micen-services.real.notaires.fr;eva-micen-upload.real.notaires.fr;micen-upload.real.notaires.fr;micen-services.real.notaires.fr;micen-portail.real.notaires.fr;rmn.real.notaires.fr;eval-anf-services.notaires.fr;eva-planete.real.notaires.fr;eval-anf-stock.notaires.fr;eva-cgu.real.notaires.fr;ref-wsoid.production-real.fr;ref-sacre.production-real.fr;eva-wsrmniban.real.notaires.fr</Exceptions>
      <Login>maj-genapi.CSN1</Login>
      <Password>yxfS=998</Password>
    </RelayProxy>
  </Proxy>
  <Certificates>
    <DefaultClientCertificatePolicyOIDPattern>1\\.2\\.250\\.1\\.78\\.1*.[1235]*\\.3\\.1\\.3\\.1\\.2\\.[125]\\.3\\.2</DefaultClientCertificatePolicyOIDPattern>
    <DefaultServerCertificatePolicyOIDPattern>1\\.2\\.250\\.1\\.78\\..*</DefaultServerCertificatePolicyOIDPattern>
    <LdapURL>ref-annuaire.real.notaires.fr:389</LdapURL>
  </Certificates>
  <Logs>
    <ManagerLogLevel>DEBUG</ManagerLogLevel>
    <ServiceLogLevel>DEBUG</ServiceLogLevel>
  </Logs>
</Configuration>`;
  rightSecuredUrls: string = `<?xml version="1.0"?>
<SECURED_URLS xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <SECURED_URL SOURCE_URL="rmn.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="rmn.real.notaires.fr" DESTINATION_PORT="5054" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="micen-services.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="micen-services.real.notaires.fr" DESTINATION_PORT="5020" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="micen-upload.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="micen-upload.real.notaires.fr" DESTINATION_PORT="5021" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eval-anf-stock.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eval-anf-stock.notaires.fr" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eval-anf-services.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eval-anf-services.notaires.fr" DESTINATION_PORT="5069" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="edi-qualif.cdc-net.com" SOURCE_PORT="80" DESTINATION_URL="edi-qualif.cdc-net.com" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-cgu.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-cgu.real.notaires.fr" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="ppr.livre-foncier-amalfi.fr" SOURCE_PORT="80" DESTINATION_URL="ppr.livre-foncier-amalfi.fr" DESTINATION_PORT="4435" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="recproj-edic.cdc-net.com" SOURCE_PORT="80" DESTINATION_URL="recproj-edic.cdc-net.com" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-planete.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-planete.real.notaires.fr" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-micen-portail.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-micen-portail.real.notaires.fr" DESTINATION_PORT="5022" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-micen-services.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-micen-services.real.notaires.fr" DESTINATION_PORT="5020" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-micen-upload.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-micen-upload.real.notaires.fr" DESTINATION_PORT="5021" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-wsrmniban.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-wsrmniban.real.notaires.fr" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-wsrmnmicen.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-wsrmnmicen.real.notaires.fr" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="eva-wsrmnng.real.notaires.fr" SOURCE_PORT="80" DESTINATION_URL="eva-wsrmnng.real.notaires.fr" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="ref-sacrecms.awr.production-real.fr" SOURCE_PORT="80" DESTINATION_URL="ref-sacre.production-real.fr" DESTINATION_PORT="5052" SECURE_MODE="Tls12" />
  <SECURED_URL SOURCE_URL="recproj-awr-edi.cdc-net.com" SOURCE_PORT="80" DESTINATION_URL="recproj-awr-edi.cdc-net.com" DESTINATION_PORT="443" SECURE_MODE="Tls12" />
</SECURED_URLS>`
  rightHostsConfig: string = `10.20.250.62 ref-sacre.production-real.fr
10.20.250.71 ref-annuaire.production-real.fr
10.20.250.71 ref-annuaire.real.notaires.fr
10.20.250.72 ref-crldp.production-real.fr
10.20.250.73 ref-ocsp.production-real.fr
10.20.250.74 ref-tst.production-real.fr
10.20.250.75 ref-wsoid.production-real.fr
10.20.250.76 ref-dxs.production-real.fr
10.20.250.49 eva-wsrmniban.real.notaires.fr
172.30.100.100 proxy.notaires.fr`;
}
