import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { ActivateDeactivate } from '../../shared/ActivateDeactivate';
import { SectionDivider, StyledInput, StyledButton } from '../../shared/StyledComponents';
import { WalletStatus } from '../../shared/WalletStatus';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoyaltyCoinHelper from '../../../core'


const StyledLabel = styled.label`
  font-weight: bold;
`;


function RemainingTokens(props) {
  const tokenSymbol = useSelector((state) => state.token.tokenSymbol);
  const totalSupply = useSelector((state) => state.token.totalSupply);
  return (
    <StyledLabel>REMAINING TOKENS: {totalSupply} {tokenSymbol}</StyledLabel>
  );
}

export function LoyaltyCoinDistributionPage(props) {
  const context = useWeb3React();
  const { library } = context;
  const [signer, setSigner] = useState();
  const [airdropAmount, setAirdropAmount] = useState('');
  const [airdropAddress, setAirdropAddress] = useState('');
  const tokenName = useSelector((state) => state.token.tokenName);
  const tokenSymbol = useSelector((state) => state.token.tokenSymbol);

  useEffect(() => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  function handleAirdropAmountChange(event) {
    event.preventDefault();
    setAirdropAmount(event.target.value);
  }

  function handleAirdropAddressChange(event) {
    event.preventDefault();
    setAirdropAddress(event.target.value);
  }

  function handleDistributeTokens(event) {
    event.preventDefault();

    async function distributeLoyaltyTokens(signer) {
      try {
        console.log(`Starting to distribute ${tokenName} tokens`);
        const amount = ethers.utils.parseEther(airdropAmount);
        const helper = new LoyaltyCoinHelper(signer);
        helper.earnCoins(tokenSymbol, airdropAddress, amount);

      } catch (error) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    distributeLoyaltyTokens(signer);
  }

  return (
    <>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <RemainingTokens />
      <StyledInput
        id="airdropAmount"
        type="text"
        placeholder={airdropAmount ? '' : 'Airdrop Amount'}
        onChange={handleAirdropAmountChange}
      ></StyledInput>
      <StyledInput
        id="airdropAddressInput"
        type="text"
        placeholder={airdropAddress ? '' : 'Airdrop Address'}
        onChange={handleAirdropAddressChange}
      ></StyledInput>
      <StyledButton
        id="createTokenButton"
        onClick={handleDistributeTokens}
      >
        Distribute Tokens
      </StyledButton>
    </>
  );
}
