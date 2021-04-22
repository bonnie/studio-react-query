/* eslint-disable max-lines-per-function */
import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

import type { Treatment as TreatmentType } from '../../../../shared/types';
import { baseImageUrl } from '../../constants';

interface TreatmentProps {
  treatmentData: TreatmentType;
}
export function Treatment({ treatmentData }: TreatmentProps): ReactElement {
  return (
    <Center py={12}>
      <Box
        role="group"
        p={6}
        maxW="330px"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="lg"
          mt={-12}
          pos="relative"
          height="230px"
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `${baseImageUrl}/${treatmentData.imageUrl}`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded="lg"
            height={230}
            width={282}
            objectFit="cover"
            src={`${baseImageUrl}/${treatmentData.imageUrl}`}
            alt={treatmentData.name}
          />
        </Box>
        <Stack pt={10}>
          <Heading fontSize="2xl">{treatmentData.name}</Heading>
          <Stack align="center">
            <Text>{treatmentData.description}</Text>

            <Text fontSize="xs" alignSelf="end">
              Photo by{' '}
              <Link href={treatmentData.imageCredit.authorLink}>
                {treatmentData.imageCredit.authorName}
              </Link>{' '}
              from{' '}
              <Link href={treatmentData.imageCredit.platformLink}>
                {treatmentData.imageCredit.platformName}
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
