import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import getPageContext from './getPageContext';
import checkLoggedIn from '../utils/checkLoggedIn';
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
    title: false,
  },
  {
    pathname: '/admin',
    title: 'Painel de Administração',
  },
];

function findActivePage(currentPages, url) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return url.pathname.indexOf(page.pathname) === 0;
    }

    // Should be an exact match if no children
    return url.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== url.pathname) {
    return findActivePage(activePage.children, url);
  }

  return activePage;
}

function withRoot(Component) {
  class WithRoot extends React.Component {
    getChildContext() {
      return {
        url: this.props.url ? this.props.url : null,
        pages,
        activePage: findActivePage(pages, this.props.url),
        loggedInUser: this.props.loggedInUser,
      };
    }

    componentWillMount() {
      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object,
    url: PropTypes.object,
  };

  WithRoot.childContextTypes = {
    url: PropTypes.object,
    pages: PropTypes.array,
    activePage: PropTypes.object,
    loggedInUser: PropTypes.object,
  };

  WithRoot.getInitialProps = async (ctx, apollo) => {
    const { loggedInUser } = await checkLoggedIn(ctx, apollo);

    let composedInitialProps = {};
    if (Component.getInitialProps) {
      composedInitialProps = Component.getInitialProps(ctx, apollo);
    }

    return { loggedInUser, ...composedInitialProps };
  };

  return withData(WithRoot);
}

export default withRoot;
