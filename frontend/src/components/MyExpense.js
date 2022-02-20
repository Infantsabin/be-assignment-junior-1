import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MyExpenseLists from '../screens/MyExpenseLists';

export default function Dashboard() {
    return (
        <>
         <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <MyExpenseLists />
                </Paper>
              </Grid>
            </Grid>
          </>
    );
}
