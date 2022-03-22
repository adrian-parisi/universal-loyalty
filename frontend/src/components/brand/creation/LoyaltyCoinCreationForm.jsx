import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import {
  useEffect,
  useState
} from 'react';
import { StyledInput, StyledButton } from '../../shared/StyledComponents';
import { useDispatch } from 'react-redux'
import tokenSlice, { storeToken } from '../../../features/token/tokenSlice'
import LoyaltyCoinFactory from '../../../artifacts/contracts/LoyaltyCoinFactory.sol/LoyaltyCoinFactory.json';
import LoyaltyCoinHelper from '../../../core'
import { useNavigate } from "react-router-dom";


export function LoyaltyCoinCreationForm(props) {
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
    <>
      <StyledInput
        id="brandNameInput"
        type="text"
        placeholder={brandName ? '' : 'Brand Name'}
        onChange={handleBrandNameChange}
      ></StyledInput>

      <StyledInput
        id="tokenNameInput"
        type="text"
        placeholder={tokenName ? '' : 'Token Name'}
        onChange={handleTokenNameChange}
      ></StyledInput>

      <StyledInput
        id="tokenSymbolInput"
        type="text"
        placeholder={tokenSymbol ? '' : 'Token Symbol'}
        onChange={handleTokenSymbolChange}
      ></StyledInput>

      <StyledInput
        id="initialSupplyInput"
        type="text"
        placeholder={initialSupply ? '' : 'Initial Supply'}
        onChange={handleInitialSupplyChange}
      ></StyledInput>

      <StyledButton
        id="createTokenButton"
        onClick={handleCreateToken}
      >
        Create Token
      </StyledButton>
    </>
  );
}
