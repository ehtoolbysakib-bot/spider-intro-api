import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const config = {
  paths: {
    template: path.join(rootDir, 'assets', 'template.png'),
    fonts: {
      pirata: path.join(rootDir, 'assets', 'fonts', 'PirataOne-Regular.ttf'),
    },
  },
  image: {
    width: 1200,
    height: 1100,
  },
  typography: {
    valueColor: '#F5F5F5',
    fontFamily: 'Cinzel',
    defaultFontSize: 36,
    minFontSize: 18,
  },
  fieldLimits: {
    name: 50,
    age: 10,
    location: 80,
    religion: 40,
    relationship: 80,
    height: 20,
    birthday: 60,
    bestie: 60,
  },
  positions: {
    name: {
      x: 385,
      y: 255,
      maxWidth: 620,
    },
    age: {
      x: 335,
      y: 355,
      maxWidth: 670,
    },
    location: {
      x: 425,
      y: 455,
      maxWidth: 580,
    },
    religion: {
      x: 415,
      y: 555,
      maxWidth: 590,
    },
    relationship: {
      x: 475,
      y: 655,
      maxWidth: 530,
    },
    height: {
      x: 365,
      y: 755,
      maxWidth: 640,
    },
    birthday: {
      x: 415,
      y: 855,
      maxWidth: 590,
    },
    bestie: {
      x: 405,
      y: 955,
      maxWidth: 600,
    },
  },
};

export default config;
