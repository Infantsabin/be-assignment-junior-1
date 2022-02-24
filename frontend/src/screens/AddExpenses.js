import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddExpensesForm(props) {
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [paidUserList, setPaidUserList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [value, setValue] = React.useState(null);
  const [paidby, setPaidby] = React.useState('');
  const [personName, setPersonName] = React.useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    amount: '',
  })

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleFormState = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
  }
    
  const handleSubmit = (event) => {
    event.preventDefault();

     axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/api/expense`,
        {
          name: form.name,
          users: personName.map(s=>s.id),
          description: form.description,
          total: form.amount,
          paid_by_id: paidby,
          created_by_id: userId,
          date: value,
          token: token,
        }
      )
      .then((response) => {
        console.log(response.status);
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleChange = (event) => {
    setPaidby(event.target.value);
    setUserList(userList.filter((item) => item.id !== event.target.value));
  };

    useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/auth/all-users`, {
          params: { token: token },
        })
        .then((response) => {
          setUserList(response.data.values);
          setPaidUserList(response.data.values);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Expense
      </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="DateTime"
                name="date"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
        </Grid>
         <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description of expense"
              fullWidth
              autoComplete="This Expense is about.."
              variant="standard"
              onChange={handleFormState}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount( ₹ )"
              fullWidth
              autoComplete="given-amount"
              variant="standard"
              onChange={handleFormState}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label">Paid By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paidby}
              disabled={paidby !== ''}
              label="Paid by"
              fullWidth
              variant="standard"
              onChange={handleChange}
            >
              {paidUserList.map((row) => (
                <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                ))}
            </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-multiple-chip-label">People who has to pay</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            fullWidth
            variant="standard"
            value={personName}
            onChange={handleMultiSelectChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value.id} label={value.name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {userList.map((row) => (
              <MenuItem
                key={row.id}
                value={row}
                style={getStyles(row.name, personName, theme)}
              >
                {row.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        </Grid>
        <Button
        type="submit"
        onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
        </Button>      
    </React.Fragment>
  );
}
