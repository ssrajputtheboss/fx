import logo from './logo.svg';
import './App.css';
import { RouterPage } from './router';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { SearchBar } from './components';
function App() {
  return (
    <ChakraProvider>
      <div>
        <Heading mx={10} my={3} alignSelf='start' justifySelf='center'>
          {' '}
          Fx{' '}
        </Heading>
        <SearchBar />
        <RouterPage />
      </div>
    </ChakraProvider>
  );
}

export default App;
