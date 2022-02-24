import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import SharingExpenseLists from '../screens/SharingExpenseLists';
import axios from "axios";

const mdTheme = createTheme();

function SharingExpensesContent() {
  const navigate = useNavigate();
  const [sharingExpenses, setSharingExpenses] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("name");

   useEffect(() => {
    if (!token || !userId) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/expense/${userId}/sharing-expenses`, {
          params: { token: token },
        })
        .then((response) => {
          setSharingExpenses(response.data.values);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar name='Sharing Expenses' userName={userName} />
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
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <SharingExpenseLists sharingExpenses={sharingExpenses} />
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

export default function SharingExpensesScreen() {
  return <SharingExpensesContent />;
}