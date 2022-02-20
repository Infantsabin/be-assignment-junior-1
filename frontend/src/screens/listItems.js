import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleIcon from '@mui/icons-material/People';
  
export default function MenuItems(props) {  
  return (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" name='dashboard' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="My Expenses" name='mine' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sharing Expenses" name='share' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonSearchIcon />
      </ListItemIcon>
      <ListItemText primary="Friends Expenses" />
    </ListItemButton>
  </React.Fragment>
  )
};