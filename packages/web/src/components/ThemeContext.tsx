import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, darken } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue, pink } from '@material-ui/core/colors';
import { getCookie } from '../utils/helpers';

export const themeColor = blue[700];

const themeInitialOptions = {
  direction: 'ltr',
  paletteColors: {},
  paletteType: 'light',
  spacing: 8, // spacing unit
};

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
}

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

interface ActionType {
  // Use um union | se precisar de mais tipos
  type: 'CHANGE';
  payload: typeof themeInitialOptions;
}

export function ThemeProvider(props) {
  const { children } = props;

  const reducer = (state, action: ActionType) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
          direction: action.payload.direction || state.direction,
          paletteColors: action.payload.paletteColors || state.paletteColors,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  };

  const [themeOptions, dispatch] = React.useReducer(reducer, themeInitialOptions);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredType = prefersDarkMode ? 'dark' : 'light';
  const { direction, paletteColors, paletteType = preferredType, spacing } = themeOptions;

  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
      const nextPaletteType = getCookie('paletteType');

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteType: nextPaletteType },
      });
    }
  }, []);

  // persist paletteType
  React.useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;
  }, [paletteType]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme({
      direction,
      nprogress: {
        color: paletteType === 'light' ? '#006000' : '#33a133',
      },
      palette: {
        primary: {
          main: paletteType === 'light' ? blue[700] : blue[200],
        },
        secondary: {
          main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200],
        },
        type: paletteType,
        background: {
          default: paletteType === 'light' ? '#fff' : '#121212',
        },
        ...paletteColors,
      },
      spacing,
    });

    return nextTheme;
  }, [direction, paletteColors, paletteType, spacing]);

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(options => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
