// Precisamos desse script para configurar um arquivo de variáveis diferente.
const path = require('path');
const testEnvPath = path.join(__dirname, './.env.test');
const result = require('dotenv').config({ path: testEnvPath });

if (result.error) {
  throw result.error;
}
