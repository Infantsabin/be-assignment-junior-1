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
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" onClick={() => navigate("/dashboard")}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="My Expenses" onClick={() => navigate("/my-expenses")} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sharing Expenses" onClick={() => navigate("/sharing-expenses")} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonSearchIcon />
      </ListItemIcon>
      <ListItemText primary="Friends Expenses" onClick={() => navigate("/friends-expenses")}/>
    </ListItemButton>
  </React.Fragment>
  )
};