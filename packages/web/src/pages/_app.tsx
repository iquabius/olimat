// <App> customizado: https://nextjs.org/docs#custom-app
import find from 'lodash/find';
import App, { Container } from 'next/app';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';
// @ts-ignore
import { Router as Router2, useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import React from 'react';

// import AppWrapper from '../components/AppWrapper';
import PageContext, { LoggedInUser, Page } from '../components/PageContext';
import checkLoggedIn from '../utils/checkLoggedIn';
import withData from '../utils/withData';
import { ThemeProvider } from '../components/ThemeContext';

const pages: Page[] = [
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

function findActivePage(currentPages, pathname) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return pathname.indexOf(page.pathname) === 0;
    }

    // Should be an exact match if no children
    return pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== pathname) {
    return findActivePage(activePage.children, pathname);
  }

  return activePage;
}

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins],
  // @ts-ignore
  insertionPoint: process.browser ? document.querySelector('#insertion-point-jss') : null,
});

function AppWrapper(props) {
  const { children, pageProps, loggedInUser, router } = props;

  // const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  let pathname = router.pathname;
  // Add support for leading / in development mode.
  if (pathname !== '/') {
    // The leading / is only added to support static hosting (resolve /index.html).
    // We remove it to normalize the pathname.
    // See `_rewriteUrlForNextExport` on Next.js side.
    pathname = pathname.replace(/\/$/, '');
  }
  // console.log(pages, { ...router, pathname })
  const activePage = findActivePage(pages, pathname);

  return (
    <React.Fragment>
      <PageContext.Provider value={{ activePage, pages, loggedInUser }}>
        <StylesProvider jss={jss}>
          <ThemeProvider>{children}</ThemeProvider>
        </StylesProvider>
      </PageContext.Provider>
      {/* <PersistState /> */}
    </React.Fragment>
  );
}

interface Props {
  loggedInUser: LoggedInUser;
}

// @types/next doesn't allow us to use state with the App component
class OliApp extends App<Props> {
  render() {
    const { Component, loggedInUser, pageProps, router } = this.props;

    return (
      <Container>
        <AppWrapper pageProps={pageProps} loggedInUser={loggedInUser} router={router}>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </AppWrapper>
      </Container>
    );
  }
}

OliApp.getInitialProps = async ({ Component, ctx }) => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { loggedInUser, pageProps };
};

export default withData(OliApp);
