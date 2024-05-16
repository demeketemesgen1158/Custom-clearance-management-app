import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Outlet } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "@mui/material";
//
let orderS;
const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "tel",
    numeric: true,
    disablePadding: false,
    label: "Tel",
  },
  {
    id: "awb",
    numeric: true,
    disablePadding: false,
    label: "AWB",
  },
  {
    id: "weight",
    numeric: true,
    disablePadding: false,
    label: "Weight(Kg)",
  },
  {
    id: "item",
    numeric: true,
    disablePadding: false,
    label: "Item",
  },
  {
    id: "processingFee",
    numeric: true,
    disablePadding: false,
    label: "Processing fee",
  },
  {
    id: "terminalFee",
    numeric: true,
    disablePadding: false,
    label: "Terminal fee",
  },
  {
    id: "warehouseFee",
    numeric: true,
    disablePadding: false,
    label: "Warehouse fee",
  },
  {
    id: "processedBy",
    numeric: true,
    disablePadding: false,
    label: "Processed by",
  },
  {
    id: "issueDate",
    numeric: true,
    disablePadding: false,
    label: "Issue date",
  },
  {
    id: "returnDate",
    numeric: true,
    disablePadding: false,
    label: "Return date",
  },
  {
    id: "fsNo",
    numeric: true,
    disablePadding: false,
    label: "FS No",
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
            // disabled ={disability}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="All"
            // value={processedBy}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <MenuItem value="All">All status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
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

export default function AllData({
  intialDate,
  EndDate,
  awb,
  handleFilterVisibility,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("no");
  const [rows, setRows] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [editable, setEditable] = React.useState(false);

  const [noUpdated, setNoUpdated] = React.useState("");
  const [nameUpdated, setNameUpdated] = React.useState("");
  const [phoneNumberUpdated, setPhoneNumberUpdated] = React.useState("");
  const [awbUpdated, setAwbUpdated] = React.useState("");
  const [weightUpdated, setWeightUpdated] = React.useState("");
  const [itemUpdated, setItemUpdated] = React.useState("");
  const [processingFeeUpdated, setProcessingFeeUpdated] = React.useState("");
  const [terminalFeeUpdated, setTerminalFeeUpdated] = React.useState("");
  const [warehouseFeeUpdated, setWarehouseFeeUpdated] = React.useState("");
  const [processedByUpdated, setProcessedByUpdated] = React.useState("");
  const [issueDateUpdated, setIssueDateUpdated] = React.useState(new Date());
  const [returnDateUpdated, setReturnDateUpdated] = React.useState("");
  const [fsNoUpdated, setFsNoUpdated] = React.useState("");
  const [statusUpdated, setStatusUpdated] = React.useState("Pending");
  const [open, setOpen] = React.useState(true);

  let iDate = new Date(intialDate);
  let eDate = new Date(EndDate);
  let rowsL = rows.length;

  //Invoke handleFilterVisibility function to make filter compomnent visible on App component
  handleFilterVisibility();

  const HandleData = (e) => {
    fetch("https://iccsexpress.maflink.com/contentDisp.php", {
      // body: JSON.stringify(inputObj),  data you send.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "content-type": "application/json, text/html",
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      redirect: "follow", // *manual, follow, error
      referrer: "no-referrer", // *client, no-referrer
    })
      .then(function (response) {
        return response.json(); // parses json
      })
      .then(function (myJson) {
        setRows(myJson);
        setOpen(false);
      });
  };
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
    fullName: nameUpdated,
    phoneNumber: phoneNumberUpdated,
    awb: awbUpdated,
    weight: weightUpdated,
    item: itemUpdated,
    processingFee: processingFeeUpdated,
    terminalFee: terminalFeeUpdated,
    warehouseFee: warehouseFeeUpdated,
    processedBy: processedByUpdated,
    issueDate: issueDateUpdated,
    returnDate: returnDateUpdated,
    fsNo: fsNoUpdated,
    status: statusUpdated,
  };

  const handleOnChange = (e) => {
    setEditable(true);

    setNoUpdated(e.target.parentElement.childNodes[1].id);
    setNameUpdated(e.target.parentElement.childNodes[2].innerText);
    setPhoneNumberUpdated(e.target.parentElement.childNodes[3].innerText);
    setAwbUpdated(e.target.parentElement.childNodes[4].innerText);
    setWeightUpdated(e.target.parentElement.childNodes[5].innerText);
    setItemUpdated(e.target.parentElement.childNodes[6].innerText);
    setProcessingFeeUpdated(e.target.parentElement.childNodes[7].innerText);
    setTerminalFeeUpdated(e.target.parentElement.childNodes[8].innerText);
    setWarehouseFeeUpdated(e.target.parentElement.childNodes[9].innerText);
    setProcessedByUpdated(e.target.parentElement.childNodes[10].innerText);
    setIssueDateUpdated(e.target.parentElement.childNodes[11].innerText);
    setReturnDateUpdated(e.target.parentElement.childNodes[12].innerText);
    setFsNoUpdated(e.target.parentElement.childNodes[13].innerText);
    setStatusUpdated(e.target.parentElement.childNodes[14].childNodes[0].value);
  };
  const handleStatus = (e) => {
    setNoUpdated(e.target.parentElement.parentElement.childNodes[1].id);
    setNameUpdated(
      e.target.parentElement.parentElement.childNodes[2].innerText
    );
    setPhoneNumberUpdated(
      e.target.parentElement.parentElement.childNodes[3].innerText
    );
    setAwbUpdated(e.target.parentElement.parentElement.childNodes[4].innerText);
    setWeightUpdated(
      e.target.parentElement.parentElement.childNodes[5].innerText
    );
    setItemUpdated(
      e.target.parentElement.parentElement.childNodes[6].innerText
    );
    setProcessingFeeUpdated(
      e.target.parentElement.parentElement.childNodes[7].innerText
    );
    setTerminalFeeUpdated(
      e.target.parentElement.parentElement.childNodes[8].innerText
    );
    setWarehouseFeeUpdated(
      e.target.parentElement.parentElement.childNodes[9].innerText
    );
    setProcessedByUpdated(
      e.target.parentElement.parentElement.childNodes[10].innerText
    );
    setIssueDateUpdated(
      e.target.parentElement.parentElement.childNodes[11].innerText
    );
    setReturnDateUpdated(
      e.target.parentElement.parentElement.childNodes[12].innerText
    );
    setFsNoUpdated(
      e.target.parentElement.parentElement.childNodes[13].innerText
    );
    setStatusUpdated(
      e.target.parentElement.parentElement.childNodes[14].childNodes[0].value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditable(false);
    setOpen(true);
    e.target.contentEditable = false;
    fetch("https://iccsexpress.maflink.com/update.php", {
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
        setOpen(false);
      });
  };

  const isSelected = (no) => selected.indexOf(no) !== -1;

  var filteredData = rows.filter((fRow) =>
    new Date(iDate) > new Date("2000-01-01")
      ? iDate <= new Date(fRow.issueDate) && eDate >= new Date(fRow.issueDate)
      : true &&
        (awb > 0 ? fRow.awb === awb : true) &&
        (orderS === "All"
          ? fRow.status === "Delivered" || fRow.status === "Pending"
          : fRow.status === orderS) &&
        Number(fRow.no) < rows.length
  );
  const idArr = [];
  for (let i = 0; i < filteredData.length; i++) {
    idArr[rowsL - filteredData[i].no] = i + 1;
  }
  return (
    <Box>
      <HandleData />
      <Paper>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {editable ? (
          <Button onClick={handleSubmit} sx={{ p: 2 }}>
            Save changes
          </Button>
        ) : (
          <Tooltip title="Double click on row cell to edit">
            <Button sx={{ p: 2, color: "grey" }}>Save changes</Button>
          </Tooltip>
        )}
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
                      // onBlur={handleSubmit}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.awb}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.weight}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.item}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.processingFee}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.terminalFee}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.warehouseFee}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.processedBy}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.issueDate}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.returnDate}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
                    >
                      {row.fsNo}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textWrap: "noWrap", fontSize: "1em" }}
                      onDoubleClick={handleDbClick}
                      onKeyUp={handleOnChange}
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
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
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
