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
      x: 375,
      y: 245,
      maxWidth: 650,
    },
    age: {
      x: 325,
      y: 340,
      maxWidth: 700,
    },
    location: {
      x: 415,
      y: 435,
      maxWidth: 610,
    },
    religion: {
      x: 405,
      y: 530,
      maxWidth: 620,
    },
    relationship: {
      x: 465,
      y: 625,
      maxWidth: 560,
    },
    height: {
      x: 355,
      y: 720,
      maxWidth: 670,
    },
    birthday: {
      x: 405,
      y: 815,
      maxWidth: 620,
    },
    bestie: {
      x: 395,
      y: 910,
      maxWidth: 630,
    },
  },
};

export default config;
