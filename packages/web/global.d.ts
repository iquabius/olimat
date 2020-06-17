declare namespace NodeJS {
	// O initApollo.ts faz polyfill do fetch no servidor
	interface Global extends WindowOrWorkerGlobalScope {}
	interface Process {
		browser: boolean;
	}
}
