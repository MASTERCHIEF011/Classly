// material
import { Box, Grid, Container, Typography, Card } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 0),
  paddingLeft: theme.spacing(6),
  color: theme.palette.error.dark,
  backgroundColor: '#f2edf2'
}));

const RootStyle2 = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  borderRadius: '4%',
  padding: theme.spacing(6, 0),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(5),

  color: theme.palette.secondary.dark,
  backgroundColor: '#ffffff'
}));

const RootStyle3 = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4, 0),
  paddingRight: theme.spacing(2),
  margin: theme.spacing(0),
  color: theme.palette.secondary.dark,
  backgroundColor: '#4e41bf',
  borderStyle: 'none',

}));


export default function DashboardApp() {
  return (
    <RootStyle3>
      <Grid>
        <RootStyle2>

          <Grid container spacing={3}>
            <Grid item lg={4}>
              <Grid container spacing={3} lg={12}>
                <Grid item xs={12} md={12} lg={12}>
                  <div>
                    <Typography>Harsh Pandey</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <AppNewsUpdate />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <AppConversionRates />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <AppCurrentSubject />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <AppCurrentVisits />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid container spacing={5} lg={12}>

          </Grid> */}

            <Grid item lg={8}>
              <RootStyle>
                <Grid container spacing={5} xs={12} md={12} lg={12}>
                  <Grid item xs={12} sm={6} md={6}>
                    <AppWeeklySales />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container spacing={3} xs={12}>
                      <Grid item xs={12} sm={6} md={12}>
                        <AppNewUsers />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <AppItemOrders />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <AppBugReports />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={12}>
                    <AppWebsiteVisits />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <AppOrderTimeline />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <AppTasks />
                  </Grid>
                </Grid>
              </RootStyle>
            </Grid>
          </Grid>
          {/* <Grid container spacing={5}>

          <Grid item xs={12} md={6} lg={7}>
            <AppWebsiteVisits />

          </Grid>
        </Grid>
        <Grid container spacing={5}>

          <Grid item xs={12} md={6} lg={3.5}>
            <AppOrderTimeline />
          </Grid>
          <Grid item xs={12} md={6} lg={3.5}>
            <AppTasks />
          </Grid>
        </Grid>
        <Grid container spacing={5}>

          <Grid item xs={12} md={6} lg={7}>
            <AppTrafficBySite />
          </Grid>
        </Grid>
 */}

          {/* <Grid container spacing={5} >

          <Grid container spacing={3} xs={6}>
            <Grid item xs={12} md={6} lg={12}>
              <AppWebsiteVisits />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <AppConversionRates />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <AppCurrentSubject />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <AppCurrentVisits />
            </Grid>
          </Grid>


          <Grid container spacing={3} xs={6}>
            <Grid item xs={12} sm={6} md={6}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <AppBugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <AppNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <AppOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <AppTasks />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <AppTrafficBySite />
            </Grid>

          </Grid>
        </Grid> */}
        </RootStyle2>
      </Grid>
    </RootStyle3>

  );
}
