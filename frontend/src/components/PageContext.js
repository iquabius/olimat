import React from 'react';

// The default value is never and should never be used.
// It's here to improve DX by enabling autocompletion for editors supporting TypeScript.
const PageContext = React.createContext({
  activePage: {
    pathname: '',
  },
  loggedInUser: {
    email: '',
  },
  pages: [],
  uiTheme: {
    paletteType: '',
    handleTogglePaletteType: () => {},
  },
});

export default PageContext;
