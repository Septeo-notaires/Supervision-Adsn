import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  telnetCommand: (data: { ip: string; port: number; }) => ipcRenderer.invoke('telnet-command', data),
  isProxiesEnabled: ():Promise<boolean> => ipcRenderer.invoke('is-proxies-enabled'),
  addressProxyServer: ():Promise<string> => ipcRenderer.invoke('address-proxy-server'),
  getProxyExceptions: ():Promise<string[]> => ipcRenderer.invoke('get-proxy-exceptions'),
  readCustomConfiguration: ():Promise<string> => ipcRenderer.invoke('read-custom-configuration'),
  readSecuredUrls: ():Promise<string> => ipcRenderer.invoke('read-secured-urls'),
  readHosts: ():Promise<string> => ipcRenderer.invoke('read-hosts'),
});
