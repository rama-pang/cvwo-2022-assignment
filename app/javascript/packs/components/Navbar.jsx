import React from 'react'
import axios from 'axios';

import setAxiosHeaders from './AxiosHeaders'

import {
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Checkbox,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import MyTasks from './MyTasks'

class Signin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Renderer = () => {
      const toast = useToast()

      const handleSignin = (e) => {
        e.preventDefault()
        if (document.getElementById("email")) {
          setAxiosHeaders()
          return axios
            .post('/users/sign_in', {
              user: {
                email: document.getElementById("email").value,                      
                password: document.getElementById("password").value,
                remember_me: document.getElementById("remember_me").value,
              }
            })
            .then(response => {
              this.props.changePage('signout')
              this.props.updateCurrentUser(response.email)
              return "Signed in"
            })                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            .catch(error => {
              return "An error occurred"
            })
        }
        return ""
      }

      const loadToast = async (e) => {
        let msg = await handleSignin(e)
        const convertToStatus = (m) => {
          if (m == "Signed in") {
            return "success"
          } else if (m == "An error occurred") {
            return "error"
          } else {
            return "info"
          }
        }      
        if (msg != "") {
          toast({
            title: msg,
            status: convertToStatus(msg),
            isClosable: true,
          })        
          msg = ""
        }
      }

      return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg='gray.50'>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account!</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg='white'
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox id="remember_me">Remember me</Checkbox>
                  </Stack>
                  <Button
                    onClick={loadToast}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
    }
    return (<Renderer />)
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Renderer = () => {
      const toast = useToast()

      const handleSignup = (e) => {
        setAxiosHeaders()
        e.preventDefault()
        return axios
          .post('/users', {
            user: {
              email: document.getElementById("email").value,
              password: document.getElementById("password").value,
              password_confirmation: document.getElementById("password").value,          
            }
          })
          .then(response => {
            this.props.changePage('signin')
            return "Signed up"
          })
          .catch(error => {
            console.log(error)
            return "An error occurred"
          })
      }

      const loadToast = async (e) => {
        let msg = await handleSignup(e)
        const convertToStatus = (m) => {
          if (m == "Signed in") {
            return "success"
          } else if (m == "An error occurred") {
            return "error"
          } else {
            return "info"
          }
        }      
        if (msg != "") {
          toast({
            title: msg,
            status: convertToStatus(msg),
            isClosable: true,
          })        
          msg = ""
        }
      }

      const [nameInput, setNameInput] = React.useState('')
      const handleNameChange = (e) => setNameInput(e.target.value)
      const isNameError = nameInput == ''

      const [passwordInput, setPasswordInput] = React.useState('')
      const handlePasswordChange = (e) => setPasswordInput(e.target.value)
      const isPasswordError = passwordInput.length < 6

      const [showPassword, setShowPassword] = React.useState(false);

      return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
              </Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired isInvalid={isNameError}>
                  <FormLabel>Email address</FormLabel>
                  <Input value={nameInput} onChange={handleNameChange} type="email" />
                  {!isNameError ? (
                    <FormHelperText>
                      Enter your email address.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      Email address cannot be empty.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl id="password" isRequired isInvalid={isPasswordError}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input value={passwordInput} onChange={handlePasswordChange} type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {!isPasswordError ? (
                    <FormHelperText>
                      Enter your password.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      Minimum password length is 6.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    onClick={resp => {
                      if (!isNameError && !isPasswordError) {
                        loadToast(resp)
                      }
                    }}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
    }
    return <Renderer />
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'signin',
      currentUser: null,
      user_signed_in: this.props.user_signed_in,
    }
    this.changePage = this.changePage.bind(this)
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
  }

  componentDidMount() {
    if (this.state.user_signed_in) {
      this.changePage('signout')
    } else {
      this.changePage('signin')
    }
  }

  changePage(newPage) {
    this.setState({
      page: newPage
    })
    if (newPage == 'signout') {
      this.setState({
        user_signed_in: true
      })
    } else {
      this.setState({
        user_signed_in: false
      })
    }
  }

  updateCurrentUser(email) {
    this.setState({
      currentUser: email,
    })
  }

  render() {
    const Renderer = () => { 
      const toast = useToast()

      const handleSignout = (e) => {
        setAxiosHeaders()
        e.preventDefault()
        return axios
          .delete('/users/sign_out', {
          })
          .then(response => {
            this.changePage('signin')
            return "Signed out"
          })
          .catch(error => {
            console.log(error)
            return "An error occurred"
          })
      }

      const loadToast = async (e) => {
        let msg = await handleSignout(e)
        const convertToStatus = (m) => {
          if (m == "Signed in") {
            return "success"
          } else if (m == "An error occurred") {
            return "error"
          } else {
            return "info"
          }
        }      
        window.location.reload()
      }

      return (
        <Stack spacing={0}>
          <Box as='header' borderRadius='md' minW='100%' p={0} bg='gray.50' px={4} align='center'>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <Button bg='gray.50' onClick={() => {
                window.location.reload()
              }}>Task Management App</Button>
              <Flex alignItems={'center'}>
                {this.state.page == 'signout' && (
                  <Button size='sm' colorScheme='red' variant='outline' onClick={loadToast}>
                    Sign Out
                  </Button>
                )}
                {!(this.state.page == 'signout') && (
                  <HStack spacing={2}>
                    <Button size='sm' colorScheme='blue' onClick={() => this.changePage('signin')}>
                      Sign In
                    </Button>                    
                    <Button size='sm' colorScheme='blue' variant='outline' onClick={() => this.changePage('signup')}>
                      Sign Up
                    </Button>
                  </HStack>                
                )}
              </Flex>
            </Flex>
          </Box>
          {this.state.page == 'signin' && (<Signin changePage={this.changePage} updateCurrentUser={this.updateCurrentUser} />)}
          {this.state.page == 'signup' && (<Signup changePage={this.changePage} updateCurrentUser={this.updateCurrentUser} />)}        
          {this.state.page == 'signout' && (<React.Fragment><Box h={4}></Box><MyTasks /></React.Fragment>)}
        </Stack>
      )
    }
    return <Renderer />
  }
}

export default Navbar
