declare namespace NodeJS {
  // interface Global extends NodeJS.Global {}
  interface Global extends GlobalFetch {
    __INSERTION_POINT__: boolean;
    // We can't import PageContext here, what to do?
    // https://stackoverflow.com/a/45422775/1787829
    __MUI_PAGE_CONTEXT__: object;
  }
  interface Process {
    browser: boolean;
  }
}
