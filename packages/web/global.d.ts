declare namespace NodeJS {
  // O initApollo.ts faz polyfill do fetch no servidor
  interface Global extends GlobalFetch {}
  interface Process {
    browser: boolean;
  }
}
