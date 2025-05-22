
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aafd5ef4cfb24f55ae697ba7ec99a0bc',
  appName: 'fight-night-scorecard',
  webDir: 'dist',
  server: {
    url: 'https://aafd5ef4-cfb2-4f55-ae69-7ba7ec99a0bc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: true,
  }
};

export default config;
