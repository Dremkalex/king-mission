import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker }  from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default function SelectTimeForm() {
  const [checkInDate, setCheckInDate] = useState(Date.now() + 7200000);
  const [checkOutDate, setCheckOutDate] = useState(Date.now() + 7260000);

  const [minCheckInDate] = useState(Date.now() + 7200000);
  const [minCheckoutDate, setMinCheckOutDate] = useState(new Date(checkInDate).getTime()+60000);

  const [isCheckInDateError, setIsCheckInDateError] = useState(false);
  const [checkInErrorMessage, setCheckInErrorMessage] = useState('');

  const [isCheckOutDateError, setIsCheckOutDateError] = useState(false);
  const [checkOutErrorMessage, setCheckOutErrorMessage] = useState('');

  useEffect(() => {
    setMinCheckOutDate(new Date(checkInDate).getTime() + 60000);
    if(checkOutDate < checkInDate) {
      setIsCheckOutDateError(true);
      setCheckOutErrorMessage('The date should be later than checkInDate');
    }
  },[checkInDate]);

  const handleCheckInDateChange = ({_d}) => {
    if(moment(_d).isBefore(minCheckInDate)){
      setIsCheckInDateError(true);
      setCheckInErrorMessage('The checkin date should be only in the next 2 hours and not sooner');
    } else {
      setIsCheckInDateError(false);
      setCheckInErrorMessage('');
      setCheckInDate(_d);
    }
  }

  const handleCheckOutDateChange = ({_d}) => {
    if(moment(_d).isBefore(minCheckoutDate)) {
      console.log('handleCheckOutDateChange Error!');
      setIsCheckOutDateError(true);
      setCheckOutErrorMessage('The date should be later than checkInDate');
    } else {
      console.log('handleCheckOutDateChange complete!');
      if (isCheckOutDateError) setIsCheckOutDateError(false);
      setCheckOutErrorMessage('');
      setCheckOutDate(_d);
    }
  }

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
            minutesStep={5}
            autoOk
            ampm={false}
            disablePast
            minDate={minCheckInDate}
            error={isCheckInDateError}
            helperText={checkInErrorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker 
            label="Checkout Date"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            format="DD.MM.YYYY  hh:mm"
            minutesStep={5}
            autoOk
            ampm={false}
            minDate={minCheckoutDate}
            minDateMessage={checkOutErrorMessage}
            error={isCheckOutDateError}
            helperText={checkOutErrorMessage}
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