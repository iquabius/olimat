// <App> customizado: https://nextjs.org/docs#custom-app
import React from 'react';
import App, { Container } from 'next/app';
import find from 'lodash/find';
import checkLoggedIn from '../utils/checkLoggedIn';
import withData from '../utils/withData';
import AppWrapper from '../components/AppWrapper';
import PageContext from '../components/PageContext';
import getPageContext from '../utils/getPageContext';
import { compose, graphql } from 'react-apollo';
import { paletteTypeQuery } from '../utils/localApollo';

const pages = [
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
    pathname: '/style',
    children: [
      {
        pathname: '/style/reboot',
      },
      {
        pathname: '/style/color',
      },
      {
        pathname: '/style/icons',
      },
      {
        pathname: '/style/typography',
      },
    ],
  },
  {
    pathname: '/layout',
    children: [
      {
        pathname: '/layout/basics',
      },
      {
        pathname: '/layout/grid',
      },
      {
        pathname: '/layout/hidden',
      },
      {
        pathname: '/layout/css-in-js',
        title: 'CSS in JS',
      },
      {
        pathname: '/layout/portal',
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

function findActivePage(currentPages, router) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return router.pathname.indexOf(page.pathname) === 0;
    }

    // Should be an exact match if no children
    return router.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== router.pathname) {
    return findActivePage(activePage.children, router);
  }

  return activePage;
}

class OliApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext(props.uiTheme.paletteType);
  }

  render() {
    const { Component, loggedInUser, pageProps, router } = this.props;

    const activePage = findActivePage(pages, router);

    return (
      <Container>
        <AppWrapper pageContext={this.pageContext}>
          <PageContext.Provider value={{ activePage, loggedInUser, pages }}>
            <Component pageContext={this.pageContext} {...pageProps} />
          </PageContext.Provider>
        </AppWrapper>
      </Container>
    );
  }
}

OliApp.getInitialProps = async ({ Component, router, ctx }) => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { loggedInUser, pageProps, router };
};

export default compose(
  withData,
  graphql(paletteTypeQuery, { name: 'uiTheme' }),
)(OliApp);
