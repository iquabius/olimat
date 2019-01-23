import { ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// Extends default ThemeOptions to include our NProgress Bar's color
declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions extends MuiThemeOptions {
    nprogress: {
      color: string;
    };
  }
}
