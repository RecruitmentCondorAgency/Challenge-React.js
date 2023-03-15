import { useState } from 'react';
import { 
  Center, 
  Box, 
  Input,
  IconButton,
  FormControl,
  HStack,
  Container,
  Card,
  CardBody,
  List,
  ListItem,
  VStack,
  Spinner,
  Alert
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ListItemUniversity from '../../components/ListItemUniversity';
import { getUniversityByName } from '../../services';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [autompleteData, setAutocompleteData] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [error, setError] = useState(null);

  const onChangeSetSearch = async (searchVal) => {
    setSearchTerm(searchVal);
    if (searchTerm.length > 4) {
      setShowAutoComplete(true);
      setIsLoadingAutocomplete(true);
      try {
        const res = await getUniversityByName(searchTerm);
        setIsLoadingAutocomplete(false);
        setAutocompleteData(res.data);
      } catch (error) {
        setError(error)
      }
    } else {
      setShowAutoComplete(false);
    }
  }

  const onClickListItem = (name) => {
    setSearchTerm(name);
    setShowAutoComplete(false);
  }

  const handleSearchUniversity = async () => {
    setShowAutoComplete(false);
    setIsLoadingResults(true);
    try {
      const res = await getUniversityByName(searchTerm);
      setIsLoadingResults(false);
      setResults(res.data);
    } catch (error) {
      setError(error);
      return;
    }
  }

  return (
    <Container maxW="4xl">
      <Center marginTop={12}>
        {error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box>
          <FormControl>
            <HStack spacing={2} alignItems={'start'} justifyContent={'center'}>
              <VStack width={'100%'}>
                <Input 
                  placeholder={'Search University'} 
                  onChange={(e) => onChangeSetSearch(e.target.value)}
                  value={searchTerm}
                />
                {showAutoComplete && (
                  <Box 
                    marginTop={2} 
                    zIndex={999} 
                    opacity={0.7} 
                    position={'relative'} 
                    width={'100%'}
                    height={'200px'}
                    overflow={'scroll'}
                  >
                    <Card>
                      <CardBody>
                        <List spacing={4}>
                          {isLoadingAutocomplete && (
                            <Center>
                              <Spinner size={'md'} color={'brand.primaryBtn'}/>
                            </Center>
                          )}
                          {autompleteData.map((d, i) => 
                            <ListItem cursor={'pointer'} key={i} onClick={() => onClickListItem(d.name)}>{d.name}</ListItem>
                          )}
                        </List>
                      </CardBody>
                    </Card>
                  </Box>
                )}
              </VStack>
              <VStack>
                <IconButton 
                  aria-label='Search' 
                  icon={<SearchIcon />} 
                  color={'white'} 
                  _hover={'brand.primaryBtn'} 
                  bg={'brand.primaryBtn'}  
                  onClick={handleSearchUniversity}       
                />
              </VStack>
            </HStack>
          </FormControl>
          <Box marginTop={12}>
            {isLoadingResults && (
              <Center>
                <Spinner size={'lg'} color={'brand.primaryBtn'}/>
              </Center>
            )}
            {results.map((u, i) => 
              <ListItemUniversity 
                key={i} 
                name={u.name} 
                country={u.country} 
                website={u.web_pages[0]}
              />
            )}
          </Box>
        </Box>
      </Center>
    </Container>
    
  )
}
