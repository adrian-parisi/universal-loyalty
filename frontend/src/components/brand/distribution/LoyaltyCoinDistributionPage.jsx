import { useWeb3React } from '@web3-react/core';
import { ActivateDeactivate } from '../../shared/ActivateDeactivate';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, Grid, TextField, Container, Typography, Button } from '@mui/material';
import LoyaltyCoinHelper from 'core'


const StyledLabel = styled.label`
  font-weight: bold;
`;


function RemainingTokens(props) {
  const tokenSymbol = useSelector((state) => state.token.tokenSymbol);
  const remainingTokens = useSelector((state) => state.token.remainingTokens);
  return (
    <Typography variant="h5">
      Remaining Tokens: {remainingTokens} {tokenSymbol}
    </Typography>
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
        const helper = new LoyaltyCoinHelper(signer);
        helper.earnCoins(tokenSymbol, airdropAddress, airdropAmount);

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
      <Divider />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RemainingTokens />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="airdropAddressInput"
              label={airdropAddress ? '' : 'Airdrop Address'}
              onChange={handleAirdropAddressChange}
              style={{ width: 1000 }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="airdropAmount"
              label={airdropAmount ? '' : 'Airdrop Amount'}
              onChange={handleAirdropAmountChange}
              style={{ width: 200 }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              id="distributeTokensButton"
              onClick={handleDistributeTokens}
              size="large"
            >
              Distribute Tokens
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
