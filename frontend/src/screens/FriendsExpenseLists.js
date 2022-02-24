import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function FriendExpenseLists(props) {
  return (
    <React.Fragment>
      <Title>Recent Expenses of Your Friend</Title>
      <Table size="small">
        <TableHead>
       <TableRow>
           <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Paid By</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Due to</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.friendExpenses.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paid_by}</TableCell>
              <TableCell>{row.created_by}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.owe_amount}</TableCell>
              <TableCell>{row.paid ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right"> &#8377;{`${row.total}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}