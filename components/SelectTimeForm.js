import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker }  from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';;

export default function SelectTimeForm() {
  const [checkInDate, setCheckInDate] = useState(Date.now() + 7200000);
  const [checkOutDate, setCheckOutDate] = useState(Date.now() + 7260000);

  const handleCheckInDateChange = ({_d}) => {
    setCheckInDate(_d);
  }

  const handleCheckOutDateChange = ({_d}) => {
    setCheckOutDate(_d);
  }

  const minCheckoutDate = new Date(checkInDate).getTime()+60000;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>

      <Typography variant="h6" gutterBottom>
        Reservation time
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            label="Checkin Date"
            value={checkInDate}
            onChange={handleCheckInDateChange}
            format="DD.MM.YYYY  hh:mm"
            autoOk
            disablePast
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker 
            label="Checkout Date"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            format="DD.MM.YYYY  hh:mm"
            autoOk
            minDate={minCheckoutDate}
            minDateMessage='The date should be later than checkInDate'
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
      </Grid>

    </MuiPickersUtilsProvider>
  );
}