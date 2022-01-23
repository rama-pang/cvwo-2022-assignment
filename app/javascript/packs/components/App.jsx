import React from 'react'
import axios from 'axios';

import setAxiosHeaders from './AxiosHeaders'
import { ChakraProvider } from '@chakra-ui/react'

import Navbar from './Navbar'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ChakraProvider>
        <Navbar user_signed_in={this.props.user_signed_in} />
      </ChakraProvider>
    )
  }
}

export default App
