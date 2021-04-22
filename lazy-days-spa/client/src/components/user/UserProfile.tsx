/* eslint-disable max-lines-per-function */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../auth/useAuth';
import { useUserProfile } from './useUserProfile';

export function UserProfile(): ReactElement {
  const { userData } = useUserProfile();

  const formElements = ['name', 'address', 'phone'];
  const [formData, setFormData] = useState({
    email: userData.email,
    name: userData.name,
    address: userData.address,
    phone: userData.phone,
  });
  const [dirty, setDirty] = useState({ email: false });

  const auth = useAuth();

  if (!auth.user) {
    return <Redirect to="/signin" />;
  }

  function updateForm(fieldName: string, value: string) {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData[fieldName] = value;
      return newData;
    });
  }

  return (
    <Flex minH="84vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" w="xl" py={12} px={6}>
        <Stack align="center">
          <Heading>Your information</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl
              id="email"
              isRequired
              isInvalid={!formData.email && dirty.email}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateForm('email', e.target.value)}
                onBlur={() =>
                  setDirty((prevDirty) => ({ ...prevDirty, email: true }))
                }
              />
              <FormErrorMessage>Email may not be blank</FormErrorMessage>
            </FormControl>
            {formElements.map((element) => (
              <FormControl id={element}>
                <FormLabel>{element}</FormLabel>
                <Input
                  value={formData[element]}
                  onChange={(e) => updateForm(element, e.target.value)}
                />
              </FormControl>
            ))}
            <Button type="submit">Update</Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
