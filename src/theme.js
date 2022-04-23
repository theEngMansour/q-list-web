import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#171dcd',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'NotoRegular',
  }
});

export default theme;