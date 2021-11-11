import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { AppItemOrders, AppNewUsers } from '.';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));
const RootStyle2 = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  margin: theme.spacing(2),
  color: theme.palette.error.dark,
  backgroundColor: theme.palette.error.light
}));
const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklySales() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }} style={{ marginBottom: '8rem' }}>
        Weekly Sales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RootStyle2>
            <div> </div>
          </RootStyle2>
        </ Grid>
        <Grid item xs={12} sm={6}>
          <RootStyle2>
            <div> </div>
          </RootStyle2>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
