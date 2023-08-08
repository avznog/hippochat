import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'front',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    url: "http://192.168.1.190:8100",
    cleartext: true
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  }
};

export default config;
