/*
Este script carrega (semeia, 'seed') o banco de dados com dados iniciais, como
exemplos de questões, escolas, etc, usadas no desenvolvimento da aplicação.
Aqui usamos o prisma-client para inserir os dados do arquivo 'data.ts'.

Discussão -> prisma-binding vs. prisma-client
https://www.prisma.io/forum/t/help-understanding-prisma-clients-value-proposition/4394/17
https://github.com/prisma/prisma/issues/2618#issuecomment-402062030

Síntese -> prisma-binding é bom quando o esquema da aplicação é parecido com o
esquema do Prisma GraphQL. O prisma-client é melhor quando o esquema da aplicação
deve ser desacoplado do esquema do Prisma GraphQL. Outros aspectos importantes
são os 'resolvers' completamente seguros quanto aos tipos ('type-safe').
*/
import { prisma } from '../../src/__generated__/prisma-client';

import data from './data';

const setup = async () => {
  // Insere as cidades
  const cities = await Promise.all(data.cities.map(prisma.createCity));

  // Insere os usuários
  const users = await Promise.all(data.users.map(prisma.createUser));

  // Insere as olimpíadas
  const olympiads = await Promise.all(data.olympiads.map(prisma.createOlympiad));

  // Insere as questões
  const questions = await Promise.all(data.questions.map(prisma.createQuestion));

  // Relaciona as 10 primeiras questões a cada uma das provas
  // Isto é feito aqui porque em data.ts não temos acesso ao id das questões
  data.tests = data.tests.map((test, index) => ({
    ...test,
    questions: {
      // Filtra as 10 questões que pertencem a prove no 'index'
      connect: questions.filter(data.isTestQuestion(index)).map(({ id }) => ({ id })),
    },
  }));
  // Insere as provas
  const tests = await Promise.all(data.tests.map(prisma.createTest));

  // Insere as escolas
  const schoolsCreate = await Promise.all(data.schools.map(prisma.createSchool));
};

setup();
