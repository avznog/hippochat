import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.bgonzva.hippochat',
  appName: 'Hippochat',
  webDir: 'www',
  // ? to upload on xcode, need no hostname, no url, and androidScheme
  server: {
    androidScheme: 'https',
    // url: "http://192.168.1.19:8100",
    // url: "http://172.20.10.3:8100",
    // url: "http://192.168.1.15:8100",
    // url: "http://10.221.14.108:8100",
    // url: "http://10.142.40.165:8100",
    // url: "http://192.168.7.191:8100",
    // url: "http://10.40.42.148:8100",
    // url: 'http://10.41.42.6:8100',
    cleartext: true,
    // hostname: "bgonzva.com"
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  }
};

export default config;
