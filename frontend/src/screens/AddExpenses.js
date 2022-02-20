import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
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
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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
  const [value, setValue] = React.useState(null);
  const [paidby, setPaidby] = React.useState('');
  const [personName, setPersonName] = React.useState([]);
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

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        <Grid item xs={12}>
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount"
              fullWidth
              autoComplete="given-amount"
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
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
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
