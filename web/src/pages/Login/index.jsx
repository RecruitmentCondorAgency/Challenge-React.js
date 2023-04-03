import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Text,
    Heading,
    Center,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Flex,
    useToast,
    Alert
} from '@chakra-ui/react';
import { ArrowForwardIcon, AlertIcon } from '@chakra-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema, setCurrentUser } from '../../utils';
import { getUsers } from '../../services';

export default function Login() {
    const navigate = useNavigate();
    const toast = useToast();
    const [error, setError] = useState(null);
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(authSchema),
    });

    const onSubmitLogin = async ({ email, password }) => {
        setIsLoadingLogin(true);
        try {
            const users = await getUsers();
            const foundUser = (users.data.find(user => user.email === email)) && (users.data.find(user => user.password === password));
            if (foundUser) {
                setIsLoadingLogin(false);
                toast({
                    title: 'Success',
                    description: 'User can be logged',
                    status: 'success',
                    duration: 3000,
                })
                setCurrentUser(foundUser);
                navigate('/search');
            } else {
                setIsLoadingLogin(false);
                toast({
                    title: 'Failed',
                    description: 'User not exists',
                    status: 'error',
                    duration: 3000,
                })
            }
        } catch (error) {
            setIsLoadingLogin(false);
            setError(error);
        }
    }

    return (
        <>
            <Container maxW="4xl">
                <Flex 
                    flexDirection={'column'} 
                    align={'center'} 
                    justify={'center'} 
                    minHeight={'80vh'}
                    gap={6}
                >
                    {error && (
                        <Alert status="error" variant="left-accent">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <Center marginTop={12}>
                        <Heading color={'brand.fontColor'} as={'h5'} size={'md'}>Log In</Heading>
                    </Center>
                    <Box w={{ sm: '100%', md: '50%' }}>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor={'email'}>Email address</FormLabel>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input type={'email'} placeholder={'You best email'} {...field} />}
                            />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>   
                    </Box>
                    <Box w={{ sm: '100%', md: '50%' }}>
                        <FormControl isInvalid={errors.password}>
                            <FormLabel htmlFor={'password'}>Password</FormLabel>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input type="password" placeholder={'You best pass'} {...field} />}
                            />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box w={{ sm: '100%', md: '50%' }}>
                        <Button 
                            width={'100%'} 
                            rightIcon={<ArrowForwardIcon />} 
                            color={'white'} 
                            _hover={'brand.primaryBtn'} 
                            bg={'brand.primaryBtn'}
                            isLoading={isLoadingLogin}
                            loadingText='Loading'
                            spinnerPlacement='end'
                            onClick={handleSubmit(onSubmitLogin)}
                        >
                            Log In
                        </Button>
                    </Box>
                    <Box>
                        <Text color={'brand.fontColor'}>
                            Create a new account here <Link style={{ textDecoration: 'underline' }} to={'/signup'}>Sign Up</Link>
                        </Text>
                    </Box>
                </Flex>
            </Container>
        </>
    )
}
