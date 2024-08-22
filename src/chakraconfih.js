// chakra.config.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  styles: {
    global: {
      body: {
        color: 'gray.800',
        bg: 'gray.50',
      },
    },
  },
  components: {
    // Add custom Chakra UI component configurations here
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
