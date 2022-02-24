import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../screens/Chart';
import Balance from '../screens/Balance';
import RecentSharing from '../screens/RecentSharing';

export default function Dashboard(props) {
    return (
        <>
         <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Balance balance={props.balance} due={props.due} owe={props.owe}/>
                </Paper>
              </Grid>
              {/* Recent RecentSharing */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RecentSharing sharings={props.sharings} />
                </Paper>
              </Grid>
            </Grid>
            </>
    );
}
