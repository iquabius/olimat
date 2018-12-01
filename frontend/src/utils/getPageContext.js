/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

function getTheme(uiTheme) {
  return createMuiTheme({
    nprogress: { color: uiTheme.paletteType === 'light' ? '#000' : '#fff' },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
    typography: { useNextVariants: true },
  });
}

const defaultTheme = {
  paletteType: 'light',
  paletteColors: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#008a00',
    },
  },
};

const theme = getTheme(defaultTheme);

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export function updatePageContext(uiTheme) {
  const { paletteColors } = defaultTheme;

  const pageContext = {
    ...global.__MUI_PAGE_CONTEXT__,
    theme: getTheme({ ...uiTheme, paletteColors }),
  };
  global.__MUI_PAGE_CONTEXT__ = pageContext;

  return pageContext;
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
