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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FriendExpenseLists from '../screens/FriendsExpenseLists';
import Typography from '@mui/material/Typography';
import Title from '../screens/Title';
import axios from "axios";

const mdTheme = createTheme();

function FriendExpensesContent() {
  const [paidby, setPaidby] = useState('');
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [friendExpenses, setFriendExpenses] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("name");
  const handleChange = (event) => {
    setPaidby(event.target.value);
    axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/expense/${event.target.value}`, {
          params: { token: token },
        })
        .then((response) => {
          setFriendExpenses(response.data.values);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };

  useEffect(() => {
    if (!token || !userId) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users-list`, {
          params: { token: token },
        })
        .then((response) => {
          setUserList(response.data.values);
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
        <Navbar name='Friends Expenses' userName={userName} />
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
              <Grid item xs={12}>
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
              onChange={handleChange}>       
              {userList.map((row) => (
                <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                ))}
            </Select>
        </Grid>
            </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <FriendExpenseLists friendExpenses={friendExpenses}/>
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