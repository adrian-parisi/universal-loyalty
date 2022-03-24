import ProductBox from "./ProductBox";
import Grid from '@mui/material/Grid';
import imageItem1 from "assets/images/item1.png";
import imageItem2 from "assets/images/item2.png";
import imageItem3 from "assets/images/item3.png";
import imageItem4 from "assets/images/item4.png";

export default function ProductList(props) {

  const itemsArray = [
    {
      key: 1,
      title: "2x1 Big Mac Combo",
      amount: "600",
      image: imageItem1
    },
    {
      key: 2,
      title: "2x1 McCafé",
      amount: "300",
      image: imageItem2
    },
    {
      key: 3,
      title: "2x1 McNuggets Combo",
      amount: "400",
      image: imageItem3
    },
    {
      key: 4,
      title: "2x1 Happy Meal",
      amount: "1000",
      image: imageItem4
    }
  ];

  return (
    <Grid container spacing={2}>
      {itemsArray.map(item => (
        <Grid key={item.key} item xs={3}>
          <ProductBox
            title={item.title}
            amount={item.amount}
            image={item.image}
            tokenSymbol={props.tokenSymbol}
          />
        </Grid>
      ))}
    </Grid>
  );
}
