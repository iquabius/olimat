// Precisamos desse script para configurar um arquivo de variáveis diferente.
import dotenv from 'dotenv';
import path from 'path';

const testEnvFile = path.join(__dirname, './.env.test');
const result = dotenv.config({ path: testEnvFile });

if (result.error) {
  throw result.error;
}
