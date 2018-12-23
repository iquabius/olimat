import * as path from 'path';

const config = {
  uploads: {
    server: 'http://localhost:4000',
    // The 'files' directory should be a docker volume,
    // maybe in a dedicated container
    basePath: 'files',
    tempDir: path.join(__dirname, '..', 'files', 'tmp'),
    publicDir: path.join(__dirname, '..', 'files', 'public'),
  },
};

export default config;
