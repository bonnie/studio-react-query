import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'olive.800',
      },
    },
  },
  fonts: {
    body: 'Lato, sans-serif',
    heading: 'Forum, sans-serif',
    mono: 'Menlo, monospace',
  },
  colors: {
    olive: {
      50: '#eff5e9',
      100: '#d5ddd3',
      200: '#bbc5b9',
      300: '#a1ad9e',
      400: '#879684',
      500: '#6e7c6a',
      600: '#556152',
      700: '#3c4539',
      800: '#222a21',
      900: '#051005',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
      },
      variants: {
        outline: {
          border: '2px solid',
          borderColor: 'olive.500',
          color: 'olive.700',
        },
        solid: {
          bg: 'olive.500',
          color: 'white',
          _hover: {
            bg: 'olive.300',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
  },
});
