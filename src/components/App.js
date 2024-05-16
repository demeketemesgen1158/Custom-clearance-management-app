import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./order";
import AllData from "./AllData";
import logo from "./logo.PNG";
import TerminalTable from "./terminalTable";
import ProcessingTable from "./processingTable";
import WarehouseTable from "./warehouseTable";
import SafZoneTable from "./safeZone";
import NewData from "./newData";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment-timezone";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  let wOpen;
  window.innerWidth > 680 ? (wOpen = true) : (wOpen = false);

  const theme = useTheme();
  const [open, setOpen] = React.useState(wOpen);
  const [iDate, setIdate] = React.useState("2000-01-01");
  const [eDate, setEdate] = React.useState(new Date());
  const [awbNo, setAwbNo] = React.useState("");
  const [filterVisiblity, setFilterVisibility] = React.useState(false);

  function handleFilterVisibility() {
    setFilterVisibility(true);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "#0000ff" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              direction="row"
              flexWrap="nowrap"
              spacing={{ xs: 10, sm: 20, md: 50 }}
            >
              <Link href="/">
                <img
                  src={logo}
                  alt="ICCS EXPRESS"
                  style={{ minWidth: "210%", height: 45 }}
                ></img>
              </Link>
              {filterVisiblity && (
                <Accordion
                  square={true}
                  elevation={0}
                  sx={{
                    display: { xs: "none", sm: !open && "flex", md: "flex" },
                    flexDirection: "column",
                    backgroundColor: "#0000ff",
                    width: 160,
                    position: "fixed",
                    top: 2,
                    right: 21,
                    zIndex: 1,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography sx={{ color: "white", fontSize: "1.1em" }}>
                      Filter
                    </Typography>
                  </AccordionSummary>
                  <Accordion square={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "orange" }} />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Date</Typography>
                    </AccordionSummary>
                    <AccordionDetails align="center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["MobileDatePicker"]}>
                          <DemoItem>
                            <MobileDatePicker
                              Value={iDate}
                              onChange={(newValue) => {
                                setIdate(
                                  moment
                                    .tz(new Date(newValue), "Africa/Nairobi")
                                    .format("YYYY-MM-DD")
                                );
                              }}
                            />
                          </DemoItem>
                          <Typography padding={2}>To</Typography>
                          <DemoItem>
                            <MobileDatePicker
                              Value={eDate}
                              onChange={(newValue) =>
                                setEdate(
                                  moment
                                    .tz(new Date(newValue), "Africa/Nairobi")
                                    .format("YYYY-MM-DD")
                                )
                              }
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion square={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "orange" }} />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Awb</Typography>
                    </AccordionSummary>
                    <AccordionDetails align="center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem>
                          <TextField
                            placeholder="Enter awb no here."
                            sx={{ paddingBottom: 7 }}
                            value={awbNo}
                            onChange={(event) => {
                              setAwbNo(event.target.value);
                            }}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </AccordionDetails>
                  </Accordion>
                </Accordion>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block", direction: "row" }}
            >
              <ListItemButton
                sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
              >
                <ListItemText>
                  {filterVisiblity && (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "orange" }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography
                          sx={{ color: "#0000ff", fontSize: "1.1em" }}
                        >
                          Filter
                        </Typography>
                      </AccordionSummary>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon sx={{ color: "orange" }} />
                          }
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>Date</Typography>
                        </AccordionSummary>
                        <AccordionDetails align="center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["MobileDatePicker"]}>
                              <DemoItem>
                                <MobileDatePicker
                                  Value={iDate}
                                  onChange={(newValue) => {
                                    setIdate(
                                      moment
                                        .tz(
                                          new Date(newValue),
                                          "Africa/Nairobi"
                                        )
                                        .format("YYYY-MM-DD")
                                    );
                                    console.log(iDate);
                                  }}
                                />
                              </DemoItem>
                              <Typography padding={2}>To</Typography>
                              <DemoItem>
                                <MobileDatePicker
                                  Value={eDate}
                                  onChange={(newValue) =>
                                    setEdate(
                                      moment
                                        .tz(
                                          new Date(newValue),
                                          "Africa/Nairobi"
                                        )
                                        .format("YYYY-MM-DD")
                                    )
                                  }
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon sx={{ color: "orange" }} />
                          }
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>Awb</Typography>
                        </AccordionSummary>
                        <AccordionDetails align="center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                              <TextField
                                placeholder="Enter awb no here."
                                sx={{ paddingBottom: 7 }}
                                value={awbNo}
                                onChange={(event) => {
                                  setAwbNo(event.target.value);
                                }}
                              />
                            </DemoItem>
                          </LocalizationProvider>
                        </AccordionDetails>
                      </Accordion>
                    </Accordion>
                  )}
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "orange" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href="/"
                    underline="none"
                    sx={{ color: "#0000ff", fontSize: "1.1em" }}
                  >
                    Home
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <PostAddIcon sx={{ color: "orange" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href="/order"
                    underline="none"
                    sx={{ color: "#0000ff", fontSize: "1.1em" }}
                  >
                    New order
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ListItem
              disablePadding
              sx={{ display: "block", direction: "row" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AirlineStopsIcon sx={{ color: "orange" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href="/terminal"
                    underline="none"
                    sx={{ color: "#0000ff", fontSize: "1.1em" }}
                  >
                    Terminal fee
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AccountTreeIcon sx={{ color: "orange" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href="processing"
                    underline="none"
                    sx={{ color: "#0000ff", fontSize: "1.1em" }}
                  >
                    Processing fee
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <WarehouseIcon sx={{ color: "orange" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href="warehouse"
                    underline="none"
                    sx={{ color: "#0000ff", fontSize: "1.1em" }}
                  >
                    Warehouse fee
                  </Link>
                </ListItemText>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <WarehouseIcon sx={{ color: "orange" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href="safezone"
                    underline="none"
                    sx={{ color: "#0000ff", fontSize: "1.1em" }}
                  >
                    SafeZone fees
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AllData
                    intialDate={iDate}
                    EndDate={eDate}
                    awb={awbNo}
                    handleFilterVisibility={handleFilterVisibility}
                  />
                }
              ></Route>
              <Route
                path="/"
                element={
                  <AllData intialDate={iDate} EndDate={eDate} awb={awbNo} />
                }
              ></Route>
              <Route path="/order" element={<Order />}></Route>
              <Route
                path="/terminal"
                element={
                  <TerminalTable
                    intialDate={iDate}
                    EndDate={eDate}
                    awb={awbNo}
                  />
                }
              ></Route>
              <Route
                path="/processing"
                element={
                  <ProcessingTable
                    intialDate={iDate}
                    EndDate={eDate}
                    awb={awbNo}
                  />
                }
              ></Route>
              <Route
                path="/warehouse"
                element={
                  <WarehouseTable
                    intialDate={iDate}
                    EndDate={eDate}
                    awb={awbNo}
                  />
                }
              ></Route>
              <Route
                path="/safezone"
                element={
                  <SafZoneTable
                    intialDate={iDate}
                    EndDate={eDate}
                    awb={awbNo}
                  />
                }
              ></Route>
              <Route
                path="/new"
                element={
                  <NewData intialDate={iDate} EndDate={eDate} awb={awbNo} />
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </Main>
      </Box>
    </>
  );
}
