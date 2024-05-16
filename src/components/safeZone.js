import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

let orderS;
const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No",
  },
  {
    id: "issueDate",
    numeric: true,
    disablePadding: false,
    label: "Issue date",
  },
  {
    id: "awb",
    numeric: true,
    disablePadding: false,
    label: "AWB",
  },
  {
    id: "aed",
    numeric: true,
    disablePadding: false,
    label: "Payment (AED)",
  },
  {
    id: "rate",
    numeric: true,
    disablePadding: false,
    label: "Exchange rate",
  },
  {
    id: "etb",
    numeric: true,
    disablePadding: false,
    label: "Payment (ETB)",
  },
  {
    id: "paymentDate",
    numeric: true,
    disablePadding: false,
    label: "Payment date",
  },
  {
    id: "withholding",
    numeric: true,
    disablePadding: false,
    label: "Withholding tax(2%)",
  },
];
function EnhancedTableHead(props) {
  const [status, setStatus] = React.useState("All");
  orderS = status;
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead sx={{ backgroundColor: "whitesmoke" }}>
      <TableRow>
        <TableCell padding="checkbox" sx={{ fontSize: "1em" }}>
          <Checkbox
            sx={{ fontWeight: "bold" }}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontWeight: "bold", textWrap: "noWrap", fontSize: "1em" }}
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell>
          <Select
            sx={{
              width: "16ch",
              height: "3.5ch",
              border: "none",
              fontWeight: "bold",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="All"
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <MenuItem value="All">All payment</MenuItem>
            <MenuItem value="debt">Debt</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function SafZoneTable({ intialDate, EndDate, awb }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("no");
  const [rows, setRows] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const [issueDateUpdated, setIssueDateUpdated] = React.useState("");
  const [noUpdated, setNoUpdated] = React.useState("");
  const [awbUpdated, setAwbUpdated] = React.useState("");
  const [aedUpdated, setAedUpdated] = React.useState("");
  const [rateUpdated, setRatetUpdated] = React.useState("");
  const [etbUpdated, setEtbUpdated] = React.useState("");
  const [paymentDateUpdated, setPaymentDateUpdate] = React.useState("");
  const [WithholdingUpdated, setWithholdingUpdated] = React.useState("");
  const [statusUpdated, setStatusUpdated] = React.useState("debt");
  const [open, setOpen] = React.useState(true);

  let iDate = new Date(intialDate);
  let eDate = new Date(EndDate);
  let rowsL = rows.length;

  const HandleData = (e) => {
    fetch("https://iccsexpress.maflink.com/safezoneContent.php", {
      // body: JSON.stringify(inputObj),  data you send.
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
        return response.json(); // parses json
      })
      .then(function (myJson) {
        setRows(myJson);
        // console.log(myJson);
        setOpen(false);
      });
  };
  // setRows(r);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.no);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, no) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDbClick = (e) => {
    e.target.contentEditable = true;
  };
  var updatedObj = {
    no: rowsL - noUpdated,
    issueDate: issueDateUpdated,
    awb: awbUpdated,
    aed: aedUpdated,
    rate: rateUpdated,
    etb: etbUpdated,
    paymentDate: paymentDateUpdated,
    withholding: WithholdingUpdated,
    status: statusUpdated,
  };

  const handleOnChange = (e) => {
    setNoUpdated(e.target.parentElement.childNodes[1].id);
    setIssueDateUpdated(e.target.parentElement.childNodes[2].innerText);
    setAwbUpdated(e.target.parentElement.childNodes[3].innerText);
    setAedUpdated(e.target.parentElement.childNodes[4].innerText);
    setRatetUpdated(e.target.parentElement.childNodes[5].innerText);
    setEtbUpdated(e.target.parentElement.childNodes[6].innerText);
    setPaymentDateUpdate(e.target.parentElement.childNodes[7].innerText);
    setWithholdingUpdated(e.target.parentElement.childNodes[8].innerText);
    setStatusUpdated(e.target.parentElement.childNodes[9].childNodes[0].value);

    // console.log(updatedObj);
  };
  const handleStatus = (e) => {
    setNoUpdated(e.target.parentElement.parentElement.childNodes[1].id);
    setIssueDateUpdated(
      e.target.parentElement.parentElement.childNodes[2].innerText
    );
    setAwbUpdated(e.target.parentElement.parentElement.childNodes[3].innerText);
    setAedUpdated(e.target.parentElement.parentElement.childNodes[4].innerText);
    setRatetUpdated(
      e.target.parentElement.parentElement.childNodes[5].innerText
    );
    setEtbUpdated(e.target.parentElement.parentElement.childNodes[6].innerText);
    setPaymentDateUpdate(
      e.target.parentElement.parentElement.childNodes[7].innerText
    );
    setWithholdingUpdated(
      e.target.parentElement.parentElement.childNodes[8].innerText
    );
    setStatusUpdated(
      e.target.parentElement.parentElement.childNodes[9].childNodes[0].value
    );

    // console.log(updatedObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    e.target.contentEditable = false;
    fetch("https://iccsexpress.maflink.com/safezoneUpdate.php", {
      // URL
      body: JSON.stringify(updatedObj), // data you send.
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
        return response.json(); // parses json
      })
      .then(function (myJson) {
        // console.log(myJson);
        setOpen(false);
      });
    // .catch(error => {
    //   console.error('An error occurred:', error);
    // });
  };

  const isSelected = (no) => selected.indexOf(no) !== -1;

  const filteredData = rows.filter((fRow) =>
    new Date(iDate) > new Date("2000-01-01")
      ? iDate <= new Date(fRow.issueDate) && eDate >= new Date(fRow.issueDate)
      : true &&
        (awb > 0 ? fRow.awb === awb : true) &&
        (orderS === "All"
          ? fRow.status === "debt" || fRow.status === "paid"
          : fRow.status === orderS) &&
        Number(fRow.no) < rows.length
  );

  const aed = filteredData.reduce((sum, p) => Number(sum) + Number(p.aed), 0);
  const etb = filteredData.reduce((sum, p) => Number(sum) + Number(p.etb), 0);
  const withholding = filteredData.reduce(
    (sum, p) => Number(sum) + Number(p.withholding),
    0
  );

  const formatterAED = new Intl.NumberFormat("AED", {
    style: "currency",
    currency: "AED",
  });
  let aedFee = formatterAED.format(aed);

  const formatterETB = new Intl.NumberFormat("ETB", {
    style: "currency",
    currency: "ETB",
  });
  let etbFee = formatterETB.format(etb);
  let withTax = formatterETB.format(withholding);

  const idArr = [];
  for (let i = 0; i < filteredData.length; i++) {
    idArr[rowsL - filteredData[i].no] = i + 1;
  }

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HandleData />
      <Stack
        flexWrap="wrap"
        justifyContent="space-between"
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 0, sm: 2, md: 4 }}
        margin={0}
      >
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
          padding={1}
        >
          <Link
            href="/new"
            underline="none"
            sx={{ color: "#0000ff", fontSize: "1.1em" }}
          >
            Add new
          </Link>
        </Stack>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
          padding={1}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", textWrap: "nowrap" }}
          >
            Payment:{" "}
          </Typography>
          <Typography variant="body2">{aedFee}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="body2">{etbFee}</Typography>
        </Stack>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
          padding={1}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", textWrap: "nowrap" }}
          >
            Tax(2%):{" "}
          </Typography>
          <Typography variant="body2">{withTax}</Typography>
        </Stack>
      </Stack>
      <Paper>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {filteredData.map((row, index) => {
                const isItemSelected = isSelected(row.no);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.no)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.no}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox" sx={{ fontSize: "1em" }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={rowsL - row.no}
                      scope="row"
                      padding="none"
                    >
                      {idArr[rowsL - row.no]}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.issueDate}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.awb}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.aed}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.rate}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.etb}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.paymentDate}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      {row.withholding}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onKeyUp={handleOnChange}
                      onBlur={handleSubmit}
                    >
                      <select
                        defaultValue={row.status}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          fontSize: "1.05em",
                        }}
                        onChange={handleStatus}
                      >
                        <option value="debt">Debt</option>
                        <option value="paid">Paid</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Outlet />
    </Box>
  );
}
