import { Page } from './components/PageContext';

export const pages: Page[] = [
  {
    pathname: '/material-didatico',
    children: [
      {
        pathname: '/material-didatico/provas',
        title: 'Provas e Soluções',
      },
      {
        pathname: '/material-didatico/questoes',
        title: 'Banco de Questões',
      },
      {
        pathname: '/material-didatico/simulados',
      },
    ],
  },
  {
    pathname: '/programas-e-portais',
    children: [
      {
        pathname: '/programas/poti',
        title: 'POTI',
      },
      {
        pathname: '/programas/portal-da-matematica',
        title: 'Portal da Matemática',
      },
    ],
  },
  {
    pathname: '/edicoes-anteriores',
    children: [
      {
        pathname: '/edicoes-anteriores/2017',
      },
      {
        pathname: '/edicoes-anteriores/2016',
      },
      {
        pathname: '/edicoes-anteriores/2015',
      },
      {
        pathname: '/edicoes-anteriores/2014',
      },
      {
        pathname: '/edicoes-anteriores/mais-antigas',
      },
    ],
  },
  {
    pathname: '/',
    displayNav: false,
    title: false,
  },
  {
    pathname: '/admin',
    title: 'Painel de Administração',
    children: [
      {
        pathname: '/admin/questao-criar',
        title: 'Criar Questão',
        displayNav: false,
      },
      {
        pathname: '/admin/questao-editar',
        title: 'Editar Questão',
        displayNav: false,
      },
      {
        pathname: '/admin/questao',
        title: 'Detalhes da Questão',
        displayNav: false,
      },
      {
        pathname: '/admin/questoes',
        title: 'Questões',
      },
      {
        pathname: '/admin/provas',
        title: 'Provas',
      },
      {
        pathname: '/admin/provas/detalhes',
        title: 'Detalhes da Prova',
        displayNav: false,
      },
      {
        pathname: '/admin/cidades',
        title: 'Cidades',
      },
      {
        pathname: '/admin/escolas',
        title: 'Escolas',
      },
      {
        pathname: '/admin/olimpiadas',
        title: 'Olimpíadas',
      },
    ],
  },
];
