import {app, BrowserWindow, ipcMain, screen} from 'electron';
import * as path from 'path';
import Registry, {RegistryItem} from 'winreg';
import * as fs from 'fs/promises';
import {Telnet} from 'telnet-client';

function createWindow() {
  let mainWindow: BrowserWindow;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.removeMenu();

  let directory = `file://${path.join(__dirname, '../supervision-adsn/browser/index.html')}`
  mainWindow.loadURL(directory);
}

app.whenReady().then(createWindow);

ipcMain.handle('telnet-command', async (_, args) => {
  const { ip, port } = args;
  const connection = new Telnet();
  if (!ip || typeof ip !== 'string') {
    throw new Error(`Adresse IP invalide : ${ip}`);
  }

  const portNumber = Number(port);
  if (isNaN(portNumber) || portNumber < 0 || portNumber > 65535) {
    throw new Error(`Port invalide : ${port}`);
  }
  const params = {
    host: ip,
    port: port,
    timeout: 5000,
    negotiationMandatory: false,
    debug: true
  };

  try {
    await connection.connect(params);
    return true;
  } catch (error) {
    return false;
  }
  finally {
    if (connection.getSocket()) {
      await connection.end();
    }
  }
});

ipcMain.handle('is-proxies-enabled', async () => {
  return new Promise((resolve) => {
    const regKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'
    });

    regKey.get('ProxyEnable', (err: Error | null, item: RegistryItem) => {
      if (err) {
        console.error('Erreur lors de la récupération du proxy:', err);
        return;
      }

      const isProxyEnabled = item.value === '0x1';
      if (isProxyEnabled) {
        regKey.get('ProxyServer', (err: Error | null) => {
          if (err) {
            throw err;
          }
        });
      }

      resolve(isProxyEnabled);
    });
  });
});

ipcMain.handle('address-proxy-server', async () => {
  return new Promise((resolve) => {
    const regKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'
    });

    regKey.get('ProxyEnable', (err: Error | null) => {
      if (err) {
        throw err;
      }

      regKey.get('ProxyServer', (err: Error | null, item: RegistryItem) => {
        if (err) {
          throw err;
        }

        if (item.value === 'http=127.0.0.1:64000') {
          resolve(item.value);
          return;
        }

        resolve('');
      });
    });
  });
});

ipcMain.handle('get-proxy-exceptions', async () => {
  return new Promise((resolve) => {
    const regKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'
    });

    regKey.get('ProxyOverride', (err: Error | null, item: RegistryItem) => {
      if (err) {
        console.error('Erreur lors de la récupération des exceptions proxy:', err);
        resolve([]);
        return;
      }

      const exceptions = item?.value ? item.value.split(';') : [];
      resolve(exceptions);
    });
  });
});

ipcMain.handle('read-custom-configuration', async (_event) => {
  try {
    const fullPath = path.resolve('C:\\ProgramData\\AWR\\custom_conf\\custom_configuration.xml');
    return await fs.readFile(fullPath, 'utf-8');
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return null;
  }
});

ipcMain.handle('read-secured-urls', async (_event) => {
  try {
    const fullPath = path.resolve('C:\\ProgramData\\AWR\\custom_conf\\custom_secured_urls.xml');
    return await fs.readFile(fullPath, 'utf-8');
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return null;
  }
});
