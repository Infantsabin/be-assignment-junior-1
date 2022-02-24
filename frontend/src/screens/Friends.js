import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AddExpensesForm from '../components/AddExpensesButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FriendExpenseLists from '../screens/FriendsExpenseLists';
import Typography from '@mui/material/Typography';
import Title from '../screens/Title';

const mdTheme = createTheme();

function FriendExpensesContent() {
  const [paidby, setPaidby] = useState('');
  const handleChange = (event) => {
    setPaidby(event.target.value);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar name='Friends Expenses' />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
            <AddExpensesForm />
            </Container>
            <Footer sx={{ pt: 4 }} />
        </Box>    
          </Box>  
    </ThemeProvider>
  );
}

export default function FriendsExpensesScreen() {
  return <FriendExpensesContent />;
}