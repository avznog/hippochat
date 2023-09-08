import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Hippochat',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    // url: "http://192.168.1.19:8100",
    // url: "http://172.20.10.3:8100",
    // url: "http://192.168.1.15:8100",
    // url: "http://10.221.14.108:8100",
    // url: "http://10.142.40.165:8100",
    url: "http://192.168.7.191:8100",
    cleartext: true
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  }
};

export default config;
