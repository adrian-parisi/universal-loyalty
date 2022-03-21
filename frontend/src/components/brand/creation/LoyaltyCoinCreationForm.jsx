import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import {
  useEffect,
  useState
} from 'react';
import { useDispatch } from 'react-redux'
import { storeTokenName } from '../../../features/token/tokenSlice'
import LoyaltyCoinFactory from '../../../artifacts/contracts/LoyaltyCoinFactory.sol/LoyaltyCoinFactory.json';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

// TODO Need to figure out how to use env variables in ReactJS.
// Workaround: Deploy factory and paste contract address here.
const REACT_APP_LOYALTY_TOKEN_FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const StyledDeployContractButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 250px;
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export function LoyaltyCoinCreationForm() {
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
      try {
        console.log("Getting loyalty token factory at ", REACT_APP_LOYALTY_TOKEN_FACTORY_ADDRESS);
        const loyaltyTokenFactory = new ethers.Contract(REACT_APP_LOYALTY_TOKEN_FACTORY_ADDRESS, LoyaltyCoinFactory.abi, signer);
        console.log("Creating new loyalty token: ", tokenSymbol);
        const tx = await loyaltyTokenFactory.createLoyaltyERC20Coin(tokenName, tokenSymbol, initialSupply);
        const receipt = await tx.wait();
        const creationEvent = receipt.events.find(x => x.event === "CoinCreated");
        console.log(`Token ${tokenName} has been created with a total supply of ${initialSupply}`);
        dispatch(storeTokenName(tokenName));
        navigate("/distribution", {
          tokenName: tokenName,
          tokenSymbol: tokenSymbol
        });
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

      <StyledDeployContractButton
        id="createTokenButton"
        onClick={handleCreateToken}
      >
        Create Token
      </StyledDeployContractButton>
    </>
  );
}
