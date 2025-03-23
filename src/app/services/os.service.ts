import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor() { }

  async telnetCommand(ip: string, port: number): Promise<boolean> {
    return await window.electron.telnetCommand({ip, port});
  }

  async isProxiesEnabled(): Promise<boolean> {
    return await window.electron.isProxiesEnabled();
  }

  async addressProxyServer(): Promise<string> {
    return await window.electron.addressProxyServer();
  }

  async getProxyExceptions(): Promise<string[]> {
    return await window.electron.getProxyExceptions();
  }

  async readCustomConfiguration(): Promise<string> {
    return await window.electron.readCustomConfiguration();
  }

  async readSecuredUrls(): Promise<string> {
    return await window.electron.readSecuredUrls();
  }
}
