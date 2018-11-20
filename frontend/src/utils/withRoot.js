import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import checkLoggedIn from './checkLoggedIn';
import AppWrapper from '../components/AppWrapper';
import PageContext from '../components/PageContext';
import withData from './withData';

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
      },
      {
        pathname: '/admin/questao-editar',
        title: 'Editar Questão',
      },
      {
        pathname: '/admin/questao',
        title: 'Detalhes da Questão',
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

function withRoot(Component) {
  // eslint-disable-next-line react/prefer-stateless-function
  class WithRoot extends React.Component {
    render() {
      const { apolloClient, loggedInUser, pageContext, ...otherProps } = this.props;
      const { router } = this.props;

      const activePage = findActivePage(pages, router);

      // Add the strict mode back once the number of warnings is manageable.
      // We might miss important warnings by keeping the strict mode 🌊🌊🌊.
      // <React.StrictMode>
      // </React.StrictMode>

      return (
        <PageContext.Provider value={{ activePage, loggedInUser, pages }}>
          <AppWrapper pageContext={pageContext}>
            <Component initialProps={otherProps} />
          </AppWrapper>
        </PageContext.Provider>
      );
    }
  }

  WithRoot.propTypes = {
    loggedInUser: PropTypes.object,
    pageContext: PropTypes.object,
    router: PropTypes.object.isRequired,
  };

  WithRoot.getInitialProps = async ctx => {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);
    const router = {
      query: ctx.query,
      pathname: ctx.pathname,
      asPath: ctx.asPath,
    };

    let composedInitialProps = {};
    if (Component.getInitialProps) {
      composedInitialProps = Component.getInitialProps(ctx);
    }

    return { loggedInUser, router, ...composedInitialProps };
  };

  return withData(WithRoot);
}

export default withRoot;
