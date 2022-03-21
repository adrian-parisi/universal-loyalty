import { ActivateDeactivate } from '../../shared/ActivateDeactivate';
import { SectionDivider } from '../../shared/SectionDivider';
import { WalletStatus } from '../../shared/WalletStatus';
import { useSelector } from 'react-redux'
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: bold;
`;


function RemainingTokens(props) {
  const tokenName = useSelector((state) => state.token.tokenName)
  return (
    <StyledLabel>REMAINING TOKENS: 100 {tokenName}</StyledLabel>
  );
}


export function LoyaltyCoinDistributionPage(props) {

  return (
    <>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <RemainingTokens />
    </>
  );
}
