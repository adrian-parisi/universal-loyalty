import styled from 'styled-components';
import { Routes, Route } from "react-router-dom";
import { LoyaltyCoinCreationPage } from './components/brand/creation/LoyaltyCoinCreationPage';
import { LoyaltyCoinDistributionPage } from './components/brand/distribution/LoyaltyCoinDistributionPage';
import { LoyaltyCoinRedeemingPage } from './components/brand/redeem/LoyaltyCoinRedeemingPage.jsx';

const StyledAppDiv = styled.div`
  display: grid;
  grid-gap: 20px;
`;


export function App() {
  return (
    <StyledAppDiv>
      <Routes>
        <Route path="/" element={<LoyaltyCoinCreationPage />} />
        <Route path="/distribution" element={<LoyaltyCoinDistributionPage />} />
        <Route path="/redeem" element={<LoyaltyCoinRedeemingPage />} />
      </Routes>
    </StyledAppDiv>
  );
};
