import SearchBar from '../components/Searchbar';
import SellerPage from './SellerPage'
import { Box, Flex, Image } from '@chakra-ui/react';
import styled from 'styled-components';
import SeiConnectWallet from '../components/SeiConnectWallet';
import { SeiWalletProvider } from '@sei-js/react';
import SeiShield from '../components/images/SeiShieldLogo.png'
import CreateContract from '../components/CreateContract';

const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;

`;

const Home = () => {
  const handleSearch = (searchText: string) => {
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <CustomBox>
      <Box margin="20px">
        <Image boxSize='200px' src={SeiShield} alt='Sei Logo' />
      </Box>
      {/* <CreateContract /> */}
      {/* <SearchBar onSearch={handleSearch} /> */}
      <SeiWalletProvider
        chainConfiguration={{
          chainId: 'atlantic-2',
          restUrl: 'https://rest.atlantic-2.seinetwork.io',
          rpcUrl: 'https://rpc.atlantic-2.seinetwork.io',
        }}
        wallets={['compass', 'fin']}>
        <SeiConnectWallet />
      </SeiWalletProvider>
    </CustomBox>
  );
};

export default Home;
