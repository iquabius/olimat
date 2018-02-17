import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import AppWrapper from '../components/AppWrapper';

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
        title: 'Portal da Matemática'
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
      };
    }

    render() {
      const { pageContext, ...other } = this.props;

      return (
        <AppWrapper pageContext={pageContext}>
          <Component initialProps={other} />
        </AppWrapper>
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
  };

  WithRoot.getInitialProps = ctx => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithRoot;
}

export default withRoot;
