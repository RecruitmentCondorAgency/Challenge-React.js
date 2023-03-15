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
    useToast
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema, setCurrentUser } from '../../utils';
import { signupUser, getUsers } from '../../services';

export default function Signup() {
    const navigate = useNavigate();
    const [isLoadingSignup, setIsLoadingSignup] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(authSchema),
    });

    const onSubmitSignup = async ({ email, password }) => {
        setIsLoadingSignup(true);
        try {
            const users = await getUsers();
            const foundUser = users.data.find(user => user.email === email);
            if (foundUser) {
                setIsLoadingSignup(false);
                toast({
                    title: 'Failed',
                    description: 'This user exists',
                    status: 'error',
                    duration: 3000,
                })
            } else if (!foundUser) {
                setIsLoadingSignup(false);
                const newUser = await signupUser({ email, password });
                toast({
                    title: 'Success',
                    description: 'New account',
                    status: 'success',
                    duration: 3000,
                })
                if (newUser) {
                    setCurrentUser(newUser.data);
                    navigate('/search');
                }
            } else {
                toast({
                    title: 'Failed',
                    description: 'User not can`t be created',
                    status: 'error',
                    duration: 3000,
                })
            }
        } catch (error) {
            setIsLoadingSignup(false);
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
                        <Heading color={'brand.fontColor'} as={'h5'} size={'md'}>Sign Up</Heading>
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
                            isLoading={isLoadingSignup}
                            loadingText='Loading'
                            spinnerPlacement='end'
                            onClick={handleSubmit(onSubmitSignup)}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Box>
                        <Text color={'brand.fontColor'}>
                            Do you have an account? <Link style={{ textDecoration: 'underline' }} to={'/login'}>Log In</Link>
                        </Text>
                    </Box>
                </Flex>
            </Container>
        </>
    )
}
