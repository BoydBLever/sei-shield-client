import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import Home from './pages/Home';
import SellerPage from './pages/SellerPage';

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <Home /> */}
        <SellerPage />
      </ChakraProvider>
    </>
  );
}

export default App;
