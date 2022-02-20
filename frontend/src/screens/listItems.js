import React from 'react';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleIcon from '@mui/icons-material/People';
  
export default function MenuItems() {  
  const navigate = useNavigate();

  return (
  <React.Fragment>
    <ListItemButton onClick={() => navigate("/dashboard")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => navigate("/my-expenses")}>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="My Expenses" />
    </ListItemButton>
    <ListItemButton onClick={() => navigate("/sharing-expenses")} >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sharing Expenses" />
    </ListItemButton>
    <ListItemButton onClick={() => navigate("/friends-expenses")}>
      <ListItemIcon>
        <PersonSearchIcon />
      </ListItemIcon>
      <ListItemText primary="Friends Expenses" />
    </ListItemButton>
  </React.Fragment>
  )
};