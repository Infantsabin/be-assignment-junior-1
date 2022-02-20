import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FriendExpenseLists from '../screens/FriendsExpenseLists';
import Typography from '@mui/material/Typography';
import Title from '../screens/Title';

export default function FriendExpense() {
  const [paidby, setPaidby] = useState('');
  const handleChange = (event) => {
    setPaidby(event.target.value);
  };

    return (
        <>
         <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    height: 150,
                  }}
                >
             <Grid container xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Search Your Friends Here!</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paidby}
              label="Paid by"
              fullWidth
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value={10}>Robin</MenuItem>
              <MenuItem value={20}>Sabin</MenuItem>
              <MenuItem value={30}>Jovit</MenuItem>
            </Select>
        </Grid>
            </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    height: 150,
                  }}
            >
              <Grid>
              <Title>Due to Give you</Title>
              <Typography component="h4" variant="h4">
                &#8377; 3,024.00
                </Typography>
                </Grid>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <FriendExpenseLists />
                </Paper>
              </Grid>
            </Grid>
            </>
    );
}
