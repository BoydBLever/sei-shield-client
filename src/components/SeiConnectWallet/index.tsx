import { useEffect, useState } from 'react';
import { Button, Box } from '@chakra-ui/react';
import {
  useWallet,
  useSelectWallet,
  useQueryClient,
} from '@sei-js/react';

import styled from 'styled-components';

const CustomBox = styled(Box)`

`;
export type BalanceResponseType = {
  amount: string;
  denom: string;
};

function SeiConnectWallet() {
  const { queryClient } = useQueryClient();
  const [walletBalances, setWalletBalances] = useState<BalanceResponseType[]>(
    []
  );

  const shortenAddress = (address: string) => {
    const startChars = address.substring(0, 6);
    const endChars = address.substring(address.length - 6);
    return `${startChars}...${endChars}`;
  };
  
  const { connectedWallet, accounts, offlineSigner } = useWallet();
  const { openModal } = useSelectWallet();

  // useEffect(() => {
  //   const fetchBalances = async () => {
  //     if (queryClient && accounts[0].address) {
  //       const { balances } = await queryClient.cosmos.bank.v1beta1.allBalances({
  //         address: accounts[0].address,
  //       });
  //       return balances as BalanceResponseType[];
  //     }
  //     return [];
  //   };

  //   fetchBalances().then(setWalletBalances);
  // }, [offlineSigner]);

  return (
    <CustomBox>
      {!connectedWallet ? (
        <Button onClick={openModal} mt={4} colorScheme='teal' type='button'>
          Connect Wallet
        </Button>
      ) : (
        <>
          <p>Account Address: {shortenAddress(accounts[0].address)}</p>
          {/* <p>Balance:{walletBalances}</p> */}
        </>
      )}
    </CustomBox>
  );
}

export default SeiConnectWallet;
