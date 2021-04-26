import type { UseToastOptions } from '@chakra-ui/react';

export const USER_LOCALSTORAGE_KEY = 'lazyday_user';
export const baseUrl = 'http://localhost:3030';
export const baseImageUrl = `${baseUrl}/images`;
export const toastOptions: UseToastOptions = {
  isClosable: true,
  variant: 'subtle',
  position: 'bottom',
};
