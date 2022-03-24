import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import LoyaltyCoinHelper from 'core'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function RedeemingButton(props) {
  const context = useWeb3React();
  const { library } = context;
  const [signer, setSigner] = useState();

  useEffect(() => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  const handleRedeem = async () => {
    const helper = new LoyaltyCoinHelper(signer);
    await helper.redeemCoins(props.tokenSymbol, props.amount);
  }

  return (
    <Button
      style={{ width: "100%" }}
      size="large"
      variant="outlined"
      onClick={handleRedeem}
    >
      Redeem
    </Button>
  );

}

export default function ProductBox(props) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={props.image}
        alt="Product"
      />
      <CardContent>
        <Typography variant="h6">
          {props.amount} {props.tokenSymbol}
        </Typography>
        <Typography gutterBottom variant='body1' color="Gray" component="div">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <RedeemingButton
          tokenSymbol={props.tokenSymbol}
          amount={props.amount}
        />
      </CardActions>
    </Card>
  );
}