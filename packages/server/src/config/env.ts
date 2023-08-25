import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';

const dotenvFiles = [
  path.resolve(`.env.${NODE_ENV}`),
  path.resolve(path.resolve('.env')),
];

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile,
    });
  }
});
