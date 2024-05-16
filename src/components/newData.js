import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Popover from '@mui/material/Popover';
import moment from 'moment-timezone';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
}));

export default function Order() {
  const [awb, setAwb] = React.useState('');
  const [aed, setAed] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [etb, setEtb] = React.useState('');
  const [withholding, setWithholding] = React.useState('');
  const [issueDate, setIssueDate] = React.useState(new Date());
  const [paymentDate, setPaymentDate] = React.useState('');
  const [status, setStatus] = React.useState('debt');

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  var inputObj={ 
              awb:awb, 
              aed: aed, 
              rate: rate,
              etb: etb,
              withholding: withholding,
              issueDate:issueDate, 
              paymentDate:paymentDate,
              status:status 
            };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const op = Boolean(anchorEl);
  const id = op ? 'simple-popover' : undefined;

  function BasicPopover() {
    return (
      <div>
      <Popover
        id={id}
        open={op}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Submitted successfully</Typography>
      </Popover>
      </div>
    );
  }

  function handleReset(){
    setAwb('');
    setEtb('');
    setRate('');
    setAed('');
    setWithholding('');
    setStatus('');
    setIssueDate(new Date());
    setPaymentDate('new Date()');
    setOpen(false);
    setAnchorEl(true);
  }
  const handleSubmit=(e)=>{
        e.preventDefault();
        if(awb!==''){
          setOpen(true);
        }
        else{
          alert('AWB No is required');
        }
        fetch('https://iccsexpress.maflink.com/safezoneInput.php', { // URL
          body: JSON.stringify(inputObj), // data you send.
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'content-type': 'application/json, text/html'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          // mode: 'no-cors', // no-cors, cors, *same-origin
          redirect: 'follow', // *manual, follow, error
          referrer: 'no-referrer', // *client, no-referrer
      })
      .then(function(response) {
          // manipulate response object
          // check status @ response.status etc.
          return response.json(); // parses json
      })
      .then(function(myJson) {
          // use parseed result
          handleReset();
          // console.log(myJson);
      });
  }

  return (
    <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>
        <Typography variant="h6" gutterBottom sx={{backgroundColor:'whitesmoke', padding:3, borderRadius:1}}>
          Add new
        </Typography>
        <Divider sx={{marginTop:1, width:'80%',}}/>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 0, width: '25ch', height:'4ch' },display:'flex',flexWrap: 'wrap', justifyContent:'left'}}
          autoComplete="off">
            <BasicPopover/>
            <div style={{padding:10,}}>
              <Typography sx={{paddingBottom:1}}>AWB No.*</Typography>
              <TextField
                sx={{paddingBottom:7}}
                size='small'
                required
                label="Required"
                value={awb}
                onChange={(event) => {
                  setAwb(event.target.value);
                }}
              />
            </div>
            <div style={{padding:10,}}>
              <Typography sx={{paddingBottom:1}}>Payment (AED)</Typography>
              <TextField
                sx={{paddingBottom:7}}
                size='small'
                value={aed}
                onChange={(event) => {
                  setAed(event.target.value);
                }}
                onKeyUp={()=>{
                  setEtb(Number(aed)*Number(rate))
                  setWithholding((Number((aed*rate)/1.15)*0.02).toFixed(3))
                  }
                }
              />
            </div>
            <div style={{padding:10,}}>
              <Typography sx={{paddingBottom:1}}>Exchange rate</Typography>
              <TextField
                sx={{paddingBottom:7}}
                size='small'
                value={rate}
                onChange={(event) => {
                  setRate(event.target.value);
                }}
                onKeyUp={()=>{
                  setEtb(Number(aed)*Number(rate))
                  setWithholding((Number((aed*rate)/1.15)*0.02).toFixed(3))
                  }
                }
              />
            </div>
            <div style={{padding:10,}}>
              <Typography sx={{paddingBottom:1}}>Payment (ETB)</Typography>
              <TextField
                sx={{paddingBottom:7}}
                size='small'
                value={etb}
                onChange={(event) => {
                  setEtb(event.target.value);
                }}
              />
            </div>
            <div style={{padding:10,}}>
              <Typography sx={{paddingBottom:1}}>Withholding tax(2%)</Typography>
              <TextField
                sx={{paddingBottom:7}}
                size='small'
                value={withholding}
                onChange={(event) => {
                  setWithholding(event.target.value);
                }}
              />
            </div>
            <div style={{padding:10,}}>
              <Typography>Issue date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileDatePicker']}>
                  <DemoItem>
                    <MobileDatePicker 
                      sx={{width:'21ch', height:'4.5ch', paddingBottom:7,}}
                      size='small'  
                      onChange={(newValue) =>setIssueDate(moment.tz(new Date(newValue), "Africa/Nairobi").format('YYYY-MM-DD'))}/>
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{padding:10,}}>
              <Typography>Payment date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileDatePicker']}>
                  <DemoItem>
                    <MobileDatePicker
                      sx={{width:'21ch', height:'4.5ch', paddingBottom:7}}  
                      onChange={(newValue) => setPaymentDate(moment.tz(new Date(newValue), "Africa/Nairobi").format('YYYY-MM-DD'))}/>
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{padding:10,}}>
              <Typography sx={{paddingBottom:1}}>Status</Typography>
              <Select  
                  sx={{width:'21ch'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={(event) => {
                      setStatus(event.target.value);
                  }}
              >
                <MenuItem value='debt'>Debt</MenuItem>
                <MenuItem value='paid'>Paid</MenuItem>
              </Select>
            </div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
        <Divider sx={{marginTop:3, width:'80%',}}/>
        <Box>
          <Button sx={{margin:2,}} variant="contained"
           onClick={handleSubmit}>
              Submit
          </Button>
        </Box>
      </DemoPaper>
    </Stack>
  );
}