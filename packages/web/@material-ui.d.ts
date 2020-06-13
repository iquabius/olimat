import { ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { TypeBackground as MuiTypeBackground } from '@material-ui/core/styles/createPalette';

// Extends default ThemeOptions to include our NProgress Bar's color
declare module '@material-ui/core/styles/createMuiTheme' {
	interface ThemeOptions extends MuiThemeOptions {
		nprogress: {
			color: string;
		};
	}
}

declare module '@material-ui/core/styles/createPalette' {
	interface TypeBackground extends MuiTypeBackground {
		level1: string;
		level2: string;
	}
}
