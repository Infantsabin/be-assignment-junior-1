import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AddExpensesForm from '../components/AddExpensesButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FriendExpense from '../components/FriendsExpense'

const mdTheme = createTheme();

function FriendExpensesContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header name='Friends Expenses' />
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
            <FriendExpense />
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