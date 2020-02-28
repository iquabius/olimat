import React from 'react';

interface User {
  id: string;
  name: string;
}

// We should change the query in checkLoggedIn() to get more user fields
export interface LoggedInUser {
  me: User;
}

export interface Page {
  children?: Page[];
  displayNav?: boolean;
  pathname: string;
  title?: string | false;
}

interface PageContext {
  activePage: Page;
  loggedInUser: LoggedInUser;
  pages: Page[];
}

// The default value is never and should never be used.
// It's here to improve DX by enabling autocompletion for editors supporting TypeScript.
// Do we need this if we're using TypeScript now!?
const PageContext = React.createContext<PageContext>({
  activePage: {
    title: false,
    pathname: '',
  },
  loggedInUser: {
    me: {
      id: '',
      name: '',
    },
  },
  pages: [],
});

export default PageContext;
