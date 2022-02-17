import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddExpensesForm(props) {
  const [value, setValue] = React.useState(null);
  const [paidby, setPaidby] = React.useState('');
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    addressLin1: '',
    addressLin2: '',
    city: '',
    state: '',
    postCode: '',
    country: ''
  })

  const handleFormState = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
  }
    
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setPaidby(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Expense
      </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="DateTime"
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
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Paid By</InputLabel>
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
        <Grid item xs={12} sm={6}>
          <TextField
                disabled
                id="outlined-read-only-input"
                label="Lent/Borrowed"
                fullWidth
                variant="standard"
                defaultValue="Lent"
                InputProps={{
                  readOnly: true,
                }}
              />
        </Grid>
        </Grid>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
        </Button>      
    </React.Fragment>
  );
}
