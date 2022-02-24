import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AddExpensesForm from '../components/AddExpensesButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import axios from "axios";

const mdTheme = createTheme();

function DashboardContent() {
  const navigate = useNavigate();
  const [name, setName] = useState("Rommie User");
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");

    useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/dashboard`, {
          params: { token: token },
        })
        .then((response) => {
          console.log(response.data)
          setName(response.data.values.name);
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
        <Header name='Dashboard' userName={name} />
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
            <Dashboard />
            <AddExpensesForm />
            </Container>
            <Footer sx={{ pt: 4 }} />
        </Box>    
          </Box>  
    </ThemeProvider>
  );
}

export default function DashboardScreen() {
  return <DashboardContent />;
}