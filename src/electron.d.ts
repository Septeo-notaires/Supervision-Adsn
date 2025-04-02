declare global {
  interface Window {
    electron: {
      telnetCommand: ({ip: string, port: number}) => Promise<boolean>;
      isProxiesEnabled: () => Promise<boolean>;
      addressProxyServer: () => Promise<string>;
      getProxyExceptions: () => Promise<string[]>;
      readCustomConfiguration: () => Promise<string>;
      readSecuredUrls: () => Promise<string>;
      readHosts: () => Promise<string>;
    };
  }
}

export {};
