import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import theme from './theme';
import routes from './routes';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export default function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={routes}/>
    </ChakraProvider>
  )
}