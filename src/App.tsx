import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { MainView } from './views/MainView';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <MainView />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
