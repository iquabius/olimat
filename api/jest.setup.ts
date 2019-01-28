// Precisamos desse script para configurar um arquivo de variáveis diferente.
import path from 'path';
import dotenv from 'dotenv';

const testEnvFile = path.join(__dirname, './.env.test');
const result = dotenv.config({ path: testEnvFile });

if (result.error) {
  throw result.error;
}
