import { ActivateDeactivate } from 'components/shared/ActivateDeactivate';
import { useSelector } from 'react-redux'
import ProductList from 'components/brand/redeem/ProductList'
import { Divider } from '@mui/material';


export function LoyaltyCoinRedeemingPage(props) {
  // TODO For some reason retrieving state is not working.
  const tokenName = useSelector((state) => state.token.tokenName);
  const tokenSymbol = useSelector((state) => state.token.tokenSymbol);

  return (
    <>
      <ActivateDeactivate />
      <Divider />
      <ProductList
        tokenSymbol="MCL"
      />
    </>
  );

}