declare namespace NodeJS {
  // interface Global extends NodeJS.Global {}
  interface Global extends GlobalFetch {}
  interface Process {
    browser: boolean;
  }
}
