import { useWeb3React } from '@web3-react/core';
import {
  useEffect,
  useState
} from 'react';
import { useDispatch } from 'react-redux'
import { storeToken } from '../../../features/token/tokenSlice'
import LoyaltyCoinHelper from 'core'
import { Grid, TextField, Container, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


export function LoyaltyCoinCreationSection(props) {
  const context = useWeb3React();
  const { library } = context;
  const dispatch = useDispatch()

  const [signer, setSigner] = useState();
  const [brandName, setBrandName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  function handleCreateToken(event) {
    event.preventDefault();

    async function deployLoyaltyERC20Contract(signer) {
      console.log(tokenName);
      const token = {
        name: tokenName,
        symbol: tokenSymbol,
        initialSupply: initialSupply,
        remainingTokens: initialSupply,
      };
      try {
        const helper = new LoyaltyCoinHelper(signer);
        await helper.createLoyaltyToken(token);
        dispatch(storeToken(token));
        navigate("/distribution");
      } catch (error) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    deployLoyaltyERC20Contract(signer);
  }

  function handleBrandNameChange(event) {
    event.preventDefault();
    setBrandName(event.target.value);
  }

  function handleTokenNameChange(event) {
    event.preventDefault();
    setTokenName(event.target.value);
  }

  function handleTokenSymbolChange(event) {
    event.preventDefault();
    setTokenSymbol(event.target.value);
  }

  function handleInitialSupplyChange(event) {
    event.preventDefault();
    setInitialSupply(event.target.value);
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Loyalty Token Creation
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="brandNameInput"
            label={brandName ? '' : 'Brand Name'}
            onChange={handleBrandNameChange}
            style={{ width: 500 }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="tokenNameInput"
            label={tokenName ? '' : 'Token Name'}
            onChange={handleTokenNameChange}
            style={{ width: 500 }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="tokenSymbolInput"
            label={tokenSymbol ? '' : 'Token Symbol'}
            onChange={handleTokenSymbolChange}
            style={{ width: 500 }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="initialSupplyInput"
            type="text"
            label={initialSupply ? '' : 'Initial Supply'}
            onChange={handleInitialSupplyChange}
            style={{ width: 500 }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            id="createTokenButton"
            onClick={handleCreateToken}
            size="large"
          >
            Create Token
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
