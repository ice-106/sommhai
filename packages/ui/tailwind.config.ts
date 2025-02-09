import sharedConfig from '@sommhai/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: ['./src/**/*.tsx'],
  prefix: '',
  presets: [sharedConfig],
};

export default config;
