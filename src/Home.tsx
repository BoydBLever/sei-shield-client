import SearchBar from './Searchbar';
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
import SeiConnectWallet from './SeiConnectWallet';
import { SeiWalletProvider } from '@sei-js/react';

const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  h1 {
    margin: 10px;
    font-weight: 400;
    font-size: 30px;
  }
`;

const Home = () => {
  const handleSearch = (searchText: string) => {
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <CustomBox>
      <h1>Sei Guardian</h1>
      <SearchBar onSearch={handleSearch} />
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
