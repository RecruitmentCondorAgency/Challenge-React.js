import { useState, useEffect } from 'react';
import { 
    Box, 
    Card, 
    CardBody,
    HStack,
    VStack,
    Text,
    IconButton,
    Badge,
    Alert,
    useToast,
    useBreakpointValue
} from '@chakra-ui/react';
import { StarIcon, ExternalLinkIcon, AlertIcon } from '@chakra-ui/icons';
import { getCountryDetails, addFavoriteUniversity, getUser } from '../../services';
import { getCurrentUser } from '../../utils';

export default function ListItemUniversity({ 
    name, 
    country, 
    website
}) {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [countryDetails, setCountryDetails] = useState(null);
    const [error, setError] = useState(null);
    const toast = useToast();
    
    useEffect(() => {
        (async () => {
            try {
                const res = await getCountryDetails(country);
                setCountryDetails(res.data[0])
            } catch (error) {
                setError(error);
                return;
            }
        })();
    }, [country])

    const handleAddFavoriteUniversity = async () => {
        const userId = JSON.parse(getCurrentUser()).id;
        const user = await getUser(userId);
        
        const universityToAdd = {
            name, 
            country, 
            website, 
            countryCapital: countryDetails?.capital[0],
            language: countryDetails?.languages.eng,
            location: countryDetails?.maps.googleMaps,
            population: countryDetails?.population,
            currency: countryDetails?.currencies
        }
        const dataToAdd = {
            id: user.data.id,
            email: user.data.email,
            password: user.data.password,
            universities: [
                ...user.data.universities,
                universityToAdd
            ]
        }
        try {
            const res = await addFavoriteUniversity(userId, dataToAdd);
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'New university added',
                    status: 'success',
                    duration: 3000,
                })
            } else {
                toast({
                    title: 'Failed',
                    description: 'Some problem happen adding a new university',
                    status: 'error',
                    duration: 3000,
                })
            }
        } catch (error) {
            setError(error);
            return;
        }
    }

    return (
        <Box marginTop={4} marginBottom={4}>
            {error && (
                <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            <Card borderRadius={0}>
                <CardBody>
                    <HStack alignItems={'start'} justifyContent={'space-between'}>
                        <VStack alignItems={'flex-start'}>
                            <HStack>
                                <Text fontSize={'xs'} fontWeight={'bold'}>
                                    {name}
                                </Text>
                                <Text fontSize={'xs'} color={'brand.fontColor'}>
                                    {country}
                                </Text>
                            </HStack>
                            {isMobile && (
                                <VStack>
                                    <Badge>{countryDetails?.capital[0]}</Badge>
                                    <Badge>{countryDetails?.flag}</Badge>
                                    <Badge>{countryDetails?.region}</Badge>
                                    <Badge>{countryDetails?.car.signs[0]}</Badge>
                                </VStack>
                            )}
                            {!isMobile && (
                                <HStack>
                                    <Badge>{countryDetails?.capital[0]}</Badge>
                                    <Badge>{countryDetails?.flag}</Badge>
                                    <Badge>{countryDetails?.region}</Badge>
                                    <Badge>{countryDetails?.car.signs[0]}</Badge>
                                </HStack>
                            )}
                        </VStack>
                        <HStack>
                            <IconButton 
                                as={'button'}
                                size={'xs'}
                                aria-label={'Add favorite university'} 
                                icon={<StarIcon />} 
                                onClick={handleAddFavoriteUniversity}
                            />
                            <IconButton 
                                size={'xs'}
                                as={'a'} 
                                href={website} 
                                target={'_blank'} 
                                rel={'noopener noreferrer'} 
                                aria-label={'Nav to website university'} 
                                icon={<ExternalLinkIcon />} 
                            />
                        </HStack>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    )
}
