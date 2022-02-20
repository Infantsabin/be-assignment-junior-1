import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

const current = new Date();
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = `${current.getDate()} ${monthNames[current.getMonth()+1]},${current.getFullYear()}`;

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h5">
        &#8377; 3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {date}
      </Typography>
      <div>
        <Typography component="h6" variant="h6" color="primary" gutterBottom>Total you owe</Typography>
        <Typography component="p" variant="h8">
            &#8377; 3,024.00
        </Typography>
        <Typography component="h6" variant="h6" color="primary" gutterBottom>Total due to you</Typography>
        <Typography component="p" variant="h8">
            &#8377; 3,024.00
        </Typography>
      </div>
    </React.Fragment>
  );
}