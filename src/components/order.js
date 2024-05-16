import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import moment from "moment-timezone";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "left",
}));

export default function Order() {
  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [awb, setAwb] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [item, setItem] = React.useState("");
  const [processingFee, setProcessingFee] = React.useState("");
  const [terminalFee, setTerminalFee] = React.useState("");
  const [warehouseFee, setWarehouseFee] = React.useState("");
  const [processedBy, setProcessedBy] = React.useState("");
  const [fsNo, setFsNo] = React.useState("");
  const [issueDate, setIssueDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [disability, setDisability] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  var inputObj = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    awb: awb,
    weight: weight,
    item: item,
    processingFee: processingFee,
    terminalFee: terminalFee,
    warehouseFee: warehouseFee,
    processedBy: processedBy,
    issueDate: issueDate,
    returnDate: returnDate,
    fsNo: fsNo,
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const op = Boolean(anchorEl);
  const id = op ? "simple-popover" : undefined;

  function BasicPopover() {
    return (
      <div>
        <Popover
          id={id}
          open={op}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>Submitted successfully</Typography>
        </Popover>
      </div>
    );
  }

  function handleReset() {
    setFullName("");
    setPhoneNumber("");
    setAwb("");
    setWeight("");
    setItem("");
    setProcessingFee("");
    setTerminalFee("");
    setWarehouseFee("");
    setProcessedBy("");
    setFsNo("");
    setIssueDate(new Date());
    setReturnDate(new Date());
    setDisability(false);
    setOpen(false);
    setAnchorEl(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName !== "") {
      setOpen(true);
    } else {
      alert("Full name is required");
    }
    fetch("https://iccsexpress.maflink.com/newInput.php", {
      // URL
      body: JSON.stringify(inputObj), // data you send.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "content-type": "application/json, text/html",
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      redirect: "follow", // *manual, follow, error
      referrer: "no-referrer", // *client, no-referrer
    })
      .then(function (response) {
        // manipulate response object
        // check status @ response.status etc.
        return response.json(); // parses json
      })
      .then(function (myJson) {
        // use parseed result
        handleReset();
        // console.log(myJson);
      });
  };

  return (
    <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ backgroundColor: "whitesmoke", padding: 3, borderRadius: 1 }}
        >
          Create new order
        </Typography>
        <Divider sx={{ marginTop: 1, width: "80%" }} />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 0, width: "25ch", height: "4ch" },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
          }}
          autoComplete="off"
        >
          <BasicPopover />
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Full name*</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              required
              label="Required"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Phone number</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>AWB No.</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={awb}
              onChange={(event) => {
                setAwb(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Weight(Kg)</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={weight}
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Item</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={item}
              onChange={(event) => {
                setItem(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Processing fee</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={processingFee}
              onChange={(event) => {
                setProcessingFee(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Terminal fee</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={terminalFee}
              onChange={(event) => {
                setTerminalFee(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Ware house fee</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              size="small"
              value={warehouseFee}
              onChange={(event) => {
                setWarehouseFee(event.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>Processed by</Typography>
            <Select
              sx={{ width: "21ch", height: "4.5ch" }}
              disabled={disability}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={processedBy}
              label="Processed by"
              onChange={(event) => {
                setProcessedBy(event.target.value);
              }}
            >
              <MenuItem value="Mekuria">Mekuria</MenuItem>
              <MenuItem value="Kalkidan">Kalkidan</MenuItem>
            </Select>
          </div>
          <div style={{ padding: 10 }}>
            <Typography>Issue date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDatePicker"]}>
                <DemoItem>
                  <MobileDatePicker
                    sx={{ width: "21ch", height: "4.5ch", paddingBottom: 7 }}
                    disabled={disability}
                    size="small"
                    onChange={(newValue) =>
                      setIssueDate(
                        moment
                          .tz(new Date(newValue), "Africa/Nairobi")
                          .format("YYYY-MM-DD")
                      )
                    }
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div style={{ padding: 10 }}>
            <Typography>Return date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDatePicker"]}>
                <DemoItem>
                  <MobileDatePicker
                    sx={{ width: "21ch", height: "4.5ch", paddingBottom: 7 }}
                    disabled={disability}
                    onChange={(newValue) =>
                      setReturnDate(
                        moment
                          .tz(new Date(newValue), "Africa/Nairobi")
                          .format("YYYY-MM-DD")
                      )
                    }
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div style={{ padding: 10 }}>
            <Typography sx={{ paddingBottom: 1 }}>FS No</Typography>
            <TextField
              sx={{ paddingBottom: 7 }}
              disabled={disability}
              value={fsNo}
              onChange={(event) => {
                setFsNo(event.target.value);
              }}
            />
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
        <Divider sx={{ marginTop: 3, width: "80%" }} />
        <Box>
          <Button
            disabled={disability}
            sx={{ margin: 2 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </DemoPaper>
    </Stack>
  );
}
