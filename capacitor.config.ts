import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'photo-gallery',
  webDir: 'www',
  bundledWebRuntime: false,
  server:{
    hostname: 'wd.fiorital.com'
  }
};

export default config;
