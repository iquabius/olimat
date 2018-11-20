/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#008a00',
    },
  },
});

// Configure JSS
const jss = create({
  plugins: jssPreset().plugins,
  insertionPoint: 'insertion-point-jss',
});

function createPageContext() {
  const ctxId = (Math.random() + 1).toString(36).substring(7);
  console.log(`getPageContext:createPageContext: ${ctxId}`);
  return {
    instanceId: ctxId,
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__MUI_PAGE_CONTEXT__) {
    global.__MUI_PAGE_CONTEXT__ = createPageContext();
    console.log(
      `__MUI_PAGE_CONTEXT__ not defined, createPageContext() was called: ${
        global.__MUI_PAGE_CONTEXT__.instanceId
      }`,
    );
  }
  console.log(`Using saved context: ${global.__MUI_PAGE_CONTEXT__.instanceId}`);
  return global.__MUI_PAGE_CONTEXT__;
}
