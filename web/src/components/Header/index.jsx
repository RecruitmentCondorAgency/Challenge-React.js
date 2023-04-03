import { Link, useNavigate } from 'react-router-dom'
import { 
  Box, 
  Text, 
  Card, 
  CardBody, 
  Container, 
  Image, 
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Logo from '../../../../graphics/logo.png';
import { clearCurrentUser, getCurrentUser } from '../../utils';

export default function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const logoutHandler = () => {
    clearCurrentUser();
    navigate('/login');
  }

  return (
    <header>
      <Box bg={'brand.primaryBg'}>
      <Card sx={{ borderRadius: 0 }}>
        <CardBody>
          <Container maxW={'4xl'}>
            <HStack justifyContent={'space-between'}>
              <Box>
                <Image 
                  boxSize='30px'
                  objectFit='cover'
                  src={Logo} 
                  alt='Logo' 
                />
              </Box>
              {getCurrentUser() && (
                <Box>
                  {isMobile && (
                    <Box>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<HamburgerIcon />}
                          variant='outline'
                        />
                        <MenuList>
                          <MenuItem>
                            <Link to={'search'}>
                              Search
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link to={'profile'}>
                              Profile
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={logoutHandler}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  )}
                  {!isMobile && (
                    <HStack spacing={6}>
                      <Box>
                        <Link to={'search'}>
                          <Text color={'brand.fontColor'} fontSize={'sm'} fontWeight={'bold'}>Search</Text>
                        </Link>
                      </Box>
                      <Box>
                        <Link to={'profile'}>
                          <Text color={'brand.fontColor'} fontSize={'sm'} fontWeight={'bold'}>Profile</Text>
                        </Link>
                      </Box>
                      <Box onClick={logoutHandler} cursor={'pointer'}>
                        <Text color={'brand.fontColor'} fontSize={'sm'} fontWeight={'bold'}>Logout</Text>
                      </Box>
                    </HStack>
                  )}
                </Box>
              )}
            </HStack>
          </Container>
        </CardBody>
      </Card>
      </Box>
    </header>
  )
}
