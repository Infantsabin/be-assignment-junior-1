import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000">
          Roomie
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
