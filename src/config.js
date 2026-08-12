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
    valueColor: '#1a0202',
    fontFamily: 'Pirata One',
    defaultFontSize: 38,
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
      x: 525,
      y: 245,
      maxWidth: 520,
    },
    age: {
      x: 525,
      y: 340,
      maxWidth: 520,
    },
    location: {
      x: 525,
      y: 435,
      maxWidth: 520,
    },
    religion: {
      x: 525,
      y: 530,
      maxWidth: 520,
    },
    relationship: {
      x: 525,
      y: 625,
      maxWidth: 520,
    },
    height: {
      x: 525,
      y: 720,
      maxWidth: 520,
    },
    birthday: {
      x: 525,
      y: 815,
      maxWidth: 520,
    },
    bestie: {
      x: 525,
      y: 910,
      maxWidth: 520,
    },
  },
};

export default config;
