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

import type { User } from '../../../../shared/types';
import { usePatchUser } from './hooks/usePatchUser';
import { useUser } from './hooks/useUser';
import { UserAppointments } from './UserAppointments';

export function UserProfile(): ReactElement {
  const { user } = useUser();
  const patchUser = usePatchUser();

  // a shell user that will allow us to type formData as User
  // and avoid "uncontrolled to controlled field" errors
  const emptyUser = {
    id: -1,
    email: 'none@none.none',
    name: '',
    address: '',
    phone: '',
  };

  const formElements = ['name', 'address', 'phone'];
  const [formData, setFormData] = useState<User>(
    { ...emptyUser, ...user } || emptyUser,
  );
  const [dirty, setDirty] = useState({ email: false });

  if (!user) {
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
        <UserAppointments />
        <Stack align="center">
          <Heading>Your information</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl
              id="email"
              isRequired
              isInvalid={!formData?.email && dirty.email}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={formData?.email}
                onChange={(e) => updateForm('email', e.target.value)}
                onBlur={() =>
                  setDirty((prevDirty) => ({ ...prevDirty, email: true }))
                }
              />
              <FormErrorMessage>Email may not be blank</FormErrorMessage>
            </FormControl>
            {formElements.map((element) => (
              <FormControl key={element} id={element}>
                <FormLabel>{element}</FormLabel>
                <Input
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  value={formData[element]}
                  onChange={(e) => updateForm(element, e.target.value)}
                />
              </FormControl>
            ))}
            <Button onClick={() => patchUser(formData)}>Update</Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
