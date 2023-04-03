import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  VStack,
  Heading,
  Flex,
  Center,
  Spinner
} from '@chakra-ui/react';
import { getCurrentUser } from '../../utils';
import { getUser } from '../../services';
import ListItemUniversity from '../../components/ListItemUniversity';
import SelectedUniversity from '../../components/SelectedUniversity';

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingUserProfile, setIsLoadingUserProfile] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoadingUserProfile(true);
    (async () => {
      try {
        setIsLoadingUserProfile(false);
        const res = await getUser(JSON.parse(getCurrentUser()).id);
        setUserProfile(res.data);
      } catch (error) {
        setIsLoadingUserProfile(false);
        setError(error);
        return;
      }
    })();
  }, [])

  return (
    <Container maxW="4xl">
      <Box marginTop={16} marginBottom={8}>
        {error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {userProfile?.universities && (
          <Flex 
            flexDirection={{ base: 'column', md: 'row' }} 
            justifyContent={'space-around'}
          >
            <VStack>
              <Heading size={'xl'} color={'brand.primaryBtn'}>
                My Favorites
              </Heading>
              <Box>
                {isLoadingUserProfile && (
                  <Center>
                    <Spinner size={'lg'} color={'brand.primaryBtn'}/>
                  </Center>
                )}
                {userProfile?.universities.map((u, i) =>
                  <Box onClick={() => setSelectedUniversity(u)} cursor={'pointer'}>
                    <ListItemUniversity 
                      key={i} 
                      name={u.name} 
                      country={u.country} 
                      website={u.website}
                    />
                  </Box>
                )}
              </Box>
            </VStack>
            <VStack>
              <Heading size={'xl'} color={'brand.primaryBtn'}>
                Selected university
              </Heading>
              <SelectedUniversity selectedUniversity={selectedUniversity}/>
            </VStack>
          </Flex>
        )}
      </Box>
    </Container>
  )
}
