import { ActivateDeactivate } from '../../shared/ActivateDeactivate';
import { SectionDivider } from '../../shared/SectionDivider';
import { WalletStatus } from '../../shared/WalletStatus';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: bold;
`;


function RemainingTokens(props) {
  return (
    <StyledLabel>REMAINING TOKENS: {props.remainingTokens} {props.tokenName}</StyledLabel>
  );
}


export function LoyaltyCoinDistributionPage(props) {

  return (
    <>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <RemainingTokens
        remainingTokens={props.initialSupply}
        tokenName={props.tokenName}
      />
    </>
  );
}
