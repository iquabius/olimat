import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

function getTheme(uiTheme) {
  return createMuiTheme({
    nprogress: { color: uiTheme.paletteType === 'light' ? '#006000' : '#33a133' },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
    typography: { useNextVariants: true },
  });
}

const defaultTheme = {
  // paletteType: 'light',
  paletteColors: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#008a00',
    },
  },
};

function createPageContext(paletteType) {
  const theme = getTheme({ ...defaultTheme, paletteType });

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

export function updatePageContext(paletteType) {
  const { paletteColors } = defaultTheme;

  const pageContext = {
    ...global.__MUI_PAGE_CONTEXT__,
    theme: getTheme({ paletteType, paletteColors }),
  };
  global.__MUI_PAGE_CONTEXT__ = pageContext;

  return pageContext;
}

export default function getPageContext(paletteType) {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext(paletteType);
  }

  // Reuse context on the client-side.
  if (!global.__MUI_PAGE_CONTEXT__) {
    global.__MUI_PAGE_CONTEXT__ = createPageContext(paletteType);
  }

  return global.__MUI_PAGE_CONTEXT__;
}
