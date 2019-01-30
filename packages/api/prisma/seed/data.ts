import {
  CityCreateInput,
  ExamCreateInput,
  OlympiadCreateInput,
  QuestionCreateInput,
  SchoolCreateInput,
  UserCreateInput,
} from '../../src/__generated__/prisma-client';

const users: UserCreateInput[] = [
  {
    email: 'dev@example.com',
    // plaintext password: "nooneknows"
    password: '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm',
    name: 'Pafúncio',
  },
];

const olympiads: OlympiadCreateInput[] = [
  {
    name: '10ª Olimpíada de Matemática da UNEMAT',
    isPublished: false,
    year: '2018-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '9ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2017-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '8ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2016-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '7ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2015-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '6ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2014-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '5ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2013-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '4ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2012-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '3ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2011-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '2ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2010-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
  {
    name: '1ª Olimpíada de Matemática da UNEMAT',
    isPublished: true,
    year: '2009-01-01T00:00:00.000Z',
    createdBy: { connect: { email: 'dev@example.com' } },
  },
];

const cities: CityCreateInput[] = [
  { name: 'Barra do Bugres' },
  { name: 'Cáceres' },
  { name: 'Sinop' },
];

const schools: SchoolCreateInput[] = [
  {
    name: 'Escola Adventista de 1º Grau Cáceres',
    email: 'escola_adventista@email.com',
    phone: '(65) 3372-9999',
    olympiadCood: { connect: { email: 'dev@example.com' } },
    city: { connect: { name: 'Cáceres' } },
  },
  {
    name: 'Escola Estadual de 1º e 2º Graus Júlio Müller',
    email: 'escola.julio.muller@email.com',
    phone: '(65) 3361-9999',
    olympiadCood: { connect: { email: 'dev@example.com' } },
    city: { connect: { name: 'Barra do Bugres' } },
  },
  {
    name: 'Escola Estadual 15 de Outubro',
    email: '15.outubro@email.com',
    phone: '(65) 3361-6666',
    olympiadCood: { connect: { email: 'dev@example.com' } },
    city: { connect: { name: 'Barra do Bugres' } },
  },
];

const questions: QuestionCreateInput[] = [
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'Em 13 caixas foram embalados 74 lápis. Se a capacidade máxima de cada caixa é de 6 lápis, qual é o número mínimo de lápis que pode haver em uma caixa?',
    choices: {
      create: [{ text: '1' }, { text: '* 2' }, { text: '3' }, { text: '4' }, { text: '6' }],
    },
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Joana tem R$4,80 em moedas de 50, 25 e 10 centavos. Quatro dessas moedas são de 50 centavos e seis são de 25 centavos. Quantas moedas de 10 centavos Joana possui?',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Parte de um muro, conforme figura, será construída com tijolos de cores diferentes (amarela, azul e vermelha) de maneira que tijolos que se tocam não podem ter a mesma cor.',
    imageUrl: '2018_fase2_6_7_ano_ex7.png',
    secondaryWording:
      'Cada tijolo amarelo custa R$ 6,00, cada tijolo azul custa R$ 7,00 e cada tijolo vermelho custa R$ 8,00. Qual o menor valor que se gastará na compra dos tijolos para construir essa parte do muro?',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Nas três pizzas da figura, as partes destacadas na cor cinza representam os pedaços que ainda não foram consumidos. Escreva o número decimal que representa as partes destacadas em cinza de cada pizza em relação a cada pizza inteira? Juntando as partes ainda não consumidas, qual é a porcentagem que ainda restou de uma pizza inteira?',
    imageUrl: '2017_fase3_5_ano_ex4.jpeg',
    secondaryWording: null,
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'Esse ano Clara completará 10 anos de idade e está muito ansiosa para essa data. Hoje ela perguntou à sua mãe quanto tempo falta para seu aniversário, e sua mãe, para fazê-la pensar um pouco, respondeu: dois meses de 31 dias, um mês de 30 dias mais 16 dias. Faltam para o aniversário de Clara exatamente:',
    choices: {
      create: [
        { text: '98 dias que é equivalente a 14 semanas.' },
        { text: '* 108 dias, equivalente a 15 semanas e 3 dias.' },
        { text: '108 dias, equivalente a 16 semanas.' },
        { text: '118 dias, equivalente a 16 semanas e 6 dias.' },
        { text: 'Nenhuma das alternativas.' },
      ],
    },
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'Uma cartolina foi cortada na forma retangular de dimensões 4 e 7 decímetros. Fernanda queria construir uma caixa e retirou de cada canto um quadrado de lado l, conforme mostrado na figura abaixo.',
    imageUrl: '2018_fase2_ensino_medio_ex2.jpeg',
    secondaryWording:
      'Dessa forma, qual a expressão que melhor representa o volume máximo dessa caixa?',
    choices: {
      create: [
        { text: '4l² − 22l + 28' },
        { text: 'l³ − 11l² + 28l' },
        { text: '* 4l³ − 22l² + 28l' },
        { text: '4l³ − 11l² + 28l' },
        { text: 'l³ − 22l + 28' },
      ],
    },
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'O gráfico da figura abaixo mostra o preço médio mensal do botijão de gás de cozinha vendido no Brasil durante o ano de 2017. Considerando essas informações, qual a taxa de variação média do preço do gás no Brasil, durante os cinco últimos meses do ano.',
    imageUrl: '2018_fase2_ensino_medio_ex4.jpeg',
    choices: {
      create: [
        { text: 'R$ 0,63 por mês' },
        { text: 'R$ 1,45 por mês' },
        { text: '* R$ 1,86 por mês' },
        { text: 'R$ 2,08 por mês' },
        { text: 'R$ 2,38 por mês' },
      ],
    },
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Durante o período da Copa do Mundo de Futebol na Rússia, certo tipo de refrigerante em lata estava sendo vendido em um supermercado da seguinte maneira: uma lata de 350 ml custava R$ 2,80 enquanto que uma lata de 220 ml custava R$ 2,20 . Tomando por base o preço do mililitro do refrigerante, calcule quantos por cento a lata menor é mais cara do que a lata maior.',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Um construtor precisa comprar um modelo de cerâmica para cobrir o piso de dois quartos medindo 3 metros de largura por 3 metros de comprimento, uma sala com cozinha de 6 metros por 4 metros e um banheiro de 1 metro por 2 metros. Quantas peças de cerâmica ele precisa comprar para colocar em todos os cômodos da casa informados, se cada peça mede 50 cm de largura por 50 cm de comprimento?',
    imageUrl: '2017_fase3_5_ano_ex8.jpeg',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Um ônibus urbano saiu vazio da garagem passando por seis paradas de embarque num determinado trajeto. Na primeira parada subiram 17 pessoas, na segunda desceram 5 e subiram 13 pessoas, na terceira desceram 8 e subiram 11 pessoas, na quarta desceram 9 e subiram 15 pessoas e na quinta desceram 18 e subiram 3 pessoas. Quantas pessoas estavam no ônibus quando ele partiu da quinta em direção a sexta parada?',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'As cidades de Sinop (Si), Sorriso (So) e Mutum (M) estão representadas na reta abaixo com suas respectivas iniciais. A distância entre as cidades de Sinop e Mutum é de 240 km e Sorriso está três vezes mais distante de Mutum que de Sinop. Qual a distância entre Sorriso e Mutum?',
    imageUrl: '2017_fase3_6_7__ano_ex6.jpeg',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'O estádio Maracanã, na cidade do Rio de Janeiro, foi reformado para a Copa das Confederações e para a Copa do Mundo de Futebol. Antes das reformas, a capacidade do estádio era de 94751 pessoas e, depois, essa capacidade foi reduzida em 15913 pessoas. Considerando que em uma partida realizada no Maracanã, após as reformas, haviam 5338 cadeiras vazias e que, dos presentes no estádio, 1/3 pagaram R$ 100,00 pelo ingresso, 2/5 pagaram R$ 60,00 e 4/15 pagaram R$ 40,00, quantos reais foram arrecadados com a venda de ingressos neste jogo?',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'A capacidade do tanque de gasolina do carro de João é de 52 litros. As figuras ao lado mostram o medidor de gasolina do carro no momento da partida e no momento da chegada de uma viagem feita por João. Sabendo que o litro da gasolina custa R$ 4,00, quantos reais João gastou nessa viagem?',
    imageUrl: '2017_fase3_6_7__ano_ex2.png',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Maria Clara comprou uma bicicleta no valor de R$ 1.200,00 e pagou R$ 600,00 de entrada. O restante do valor teve um acréscimo de 6% e foi dividido em três parcelas iguais. Qual o valor de cada parcela paga por Maria Clara?',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'A papelaria perto da casa do Heitor está com promoção de lápis de escrever. Comprando 10 lápis ou mais, ao invés de pagar R$ 1,25 em cada unidade, o cliente pagará R$1,09. Se Heitor resolver aproveitar a promoção e comprar 20 lápis, quanto ele irá economizar?',
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'Júlia tem três chapéus, um amarelo, um vermelho e outro azul. Júlia costuma emprestar seus chapéus para Beatriz. Ontem elas foram juntas a uma festa usando chapéus. Siga as pistas e descubra que chapéu cada uma delas usou na festa: - Quando chove, Júlia não usa o chapéu vermelho. - O chapéu amarelo não serve para Beatriz. - Ontem choveu o dia todo. - Quando Júlia usa seu chapéu amarelo ela não sai com Beatriz.',
    choices: {
      create: [
        { text: 'Júlia usou o chapéu vermelho e Beatriz, o azul.' },
        { text: 'Júlia usou o chapéu amarelo e Beatriz, o vermelho.' },
        { text: '* Júlia usou o chapéu azul e Beatriz, o vermelho.' },
        { text: 'Júlia usou o chapéu azul e Beatriz, o amarelo.' },
        { text: 'Júlia usou o chapéu amarelo e Beatriz, o azul.' },
      ],
    },
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'A figura ao lado é constituída por dois retângulos com tamanhos diferentes. Sabendo-se que o comprimento de cada lado do retângulo maior é o triplo do comprimento do lado correspondente do retângulo menor, determine a diferença entre os perímetros desses retângulos.',
    imageUrl: '2017_fase3_6_7__ano_ex5.jpeg',
  },
  {
    type: 'OPEN_ENDED',
    wording:
      'Em um armazém foram empilhadas algumas caixas de sabonetes que formam um monte conforme mostrado na figura ao lado. Se cada caixa contém 3 dúzias de sabonetes, quantos sabonetes tem no monte com todas as caixas?',
    imageUrl: '2017_fase3_6_7__ano_ex7.jpeg',
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'O quintal da casa de Joãozinho tem perímetro igual a 80 metros. Seu pai já construiu 48m de muro. Que fração do muro, o pai de Joãozinho ainda falta construir?',
    choices: {
      create: [
        { text: '5/3' },
        { text: '* 2/5' },
        { text: '5/2' },
        { text: '1/5' },
        { text: '1/3' },
      ],
    },
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'Sabendo-se que as frações estão sempre presentes no nosso dia-a-dia, pode-se afirmar que ¼ de um dia, ¼ de hora, ¼ de quilo, ¼ de litro e ¼ de ano é, respectivamente, o mesmo que:',
    choices: {
      create: [
        { text: '8 h, 15 min, 250 g, 500 ml, 4 meses;' },
        { text: '8 h, 15 min, 500 g, 250 ml, 3 meses;' },
        { text: '4 h, 20 min, 250 g, 500 ml, 3 meses;' },
        { text: '* 6 h, 15 min, 250 g, 250 ml, 3 meses;' },
        { text: '6 h, 20 min, 500 g, 250 ml, 4 meses.' },
      ],
    },
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'O professor Pedro viajou de avião para Recife-PE nas férias da Unemat, tendo embarcado em Sinop-MT. Em certo momento da viagem, as seguintes informações apareceram na tela da cabine de passageiros: • Velocidade média: 864 km/h; • Distância já percorrida: 1240 km; • Tempo que falta para a chegada em Recife: 1 h 20 min. Se o avião manteve a velocidade, então qual é, aproximadamente, a distância de Sinop à Recife?',
    choices: {
      create: [
        { text: '2300 km' },
        { text: '* 2400 km' },
        { text: '2500 km' },
        { text: '2600 km' },
        { text: '2700 km' },
      ],
    },
  },
  {
    type: 'MULTIPLE_CHOICE',
    wording:
      'O jardim de Ana tem o formato da figura abaixo. Sabendo que cada quadrado tem 1 unidade de área, podemos concluir que a área da região sombreada é:',
    imageUrl: '2018_fase2_6_7_ano_ex3.png',
    choices: {
      create: [{ text: '13' }, { text: '14' }, { text: '* 15' }, { text: '16' }, { text: '16,5' }],
    },
  },
];

const exams: ExamCreateInput[] = [
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2017 – 3ª FASE – 5° Ano',
    author: { connect: { email: 'dev@example.com' } },
    // TODO: Criar questões adicionais pra cada prova
    // Assim evitamos aquela lógia macabra pra mapear questões já criadas (examsQuestions)
    // questions: { create: [{ type: 'OPEN_ENDED', wording: 'dev@example.com' }] },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2017 – 3ª FASE – 6° e 7° Anos',
    author: { connect: { email: 'dev@example.com' } },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2017 – 3ª FASE – 8° e 9° Anos',
    author: { connect: { email: 'dev@example.com' } },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2017 – 3ª FASE – Ensino Médio',
    author: { connect: { email: 'dev@example.com' } },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2018 – 2ª FASE – 5° Ano',
    author: { connect: { email: 'dev@example.com' } },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2018 – 2ª FASE – 6° e 7° Anos',
    author: { connect: { email: 'dev@example.com' } },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2018 – 2ª FASE – 8° e 9° Anos',
    author: { connect: { email: 'dev@example.com' } },
  },
  {
    title: 'OLIMPÍADA DE MATEMÁTICA DA UNEMAT – 2018 – 2ª FASE – Ensino Médio',
    author: { connect: { email: 'dev@example.com' } },
  },
];

const examsQuestions = [
  // 10 questões pra cada prova
  [0, 1, 6, 8, 9, 11, 12, 13, 16, 18],
  [2, 3, 7, 8, 10, 13, 14, 15, 16, 17],
  [3, 5, 8, 9, 10, 11, 17, 19, 20, 21],
  [2, 4, 5, 7, 12, 15, 17, 18, 19, 21],
  // repeat
  [0, 1, 6, 8, 9, 11, 12, 13, 16, 18],
  [2, 3, 7, 8, 10, 13, 14, 15, 16, 17],
  [3, 5, 8, 9, 10, 11, 17, 19, 20, 21],
  [2, 4, 5, 7, 12, 15, 17, 18, 19, 21],
];

/**
 * Retorna uma função que testa se a prova com índice eIndex é a
 * 'dona' da questão 'question'.
 * Pode ser usada com o Array.filter():
 * randExamQuestions = questions.filter(isExamQuestion(randExamIndex));
 *
 * @param eIndex Index da prova na array 'exams' em data.ts
 */
const isExamQuestion = eIndex => (question, questionIndex) => {
  return examsQuestions[eIndex].includes(questionIndex);
};

export default {
  cities,
  users,
  olympiads,
  questions,
  exams,
  examsQuestions,
  isExamQuestion,
  schools,
};
