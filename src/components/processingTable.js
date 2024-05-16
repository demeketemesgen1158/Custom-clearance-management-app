import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  {
    id: 'no',
    numeric: false,
    disablePadding: true,
    label: 'No',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'awb',
    numeric: true,
    disablePadding: false,
    label: 'AWB',
  },
  {
    id: 'processingFee',
    numeric: true,
    disablePadding: false,
    label: 'Processing fee',
  },
];
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

  return (
    <TableHead sx={{backgroundColor:'whitesmoke'}}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox sx={{fontWeight:'bold'}}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell sx={{fontWeight:'bold',textWrap:'noWrap'}}
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
          {headCell.label}

            {/* <TableSortLabel 
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}


          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ProcessingTable({intialDate, EndDate, awb}) {
  const [open, setOpen] = React.useState(true);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('no');
  const [rows, setRows] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  let iDate = new Date(intialDate);
  let eDate=new Date(EndDate);
  let rowsL=rows.length;
    
  const HandleData=(e)=>{   
      fetch('https://iccsexpress.maflink.com/contentDisp.php', { // URL
        // body: JSON.stringify(inputObj),  data you send.
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
        // data[0]=myJson;
        setRows(myJson)
        // console.log(rows[0]);
        setOpen(false);
    });
}

  // setRows(r);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (no) => selected.indexOf(no) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );
  const filteredData = rows.filter(fRow=>((new Date(iDate)>new Date('2000-01-01'))?(iDate<=new Date(fRow.issueDate) && eDate>=new Date(fRow.issueDate)):true && (fRow.status==='Delivered' || fRow.status==='Pending') && ((awb>0)?fRow.awb===awb:true) && Number(fRow.no)<(rows.length)));
  
  let totalFee = filteredData.reduce((sum, p)=>(Number(sum) + Number(p.processingFee)), 0);
  
  const formatter = new Intl.NumberFormat('ETB', {
    style: 'currency',
    currency: 'ETB',
  });
  totalFee = formatter.format(totalFee);

  const idArr = [];
  for(let i=0; i<filteredData.length; i++){
    idArr[rowsL - filteredData[i].no]=i+1;
  }

  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <HandleData/>
      <Stack flexWrap='wrap' direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 0, sm: 2, md: 4 }} margin={0}>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 1 }} padding={1}>
          <Typography variant='subtitle2' sx={{fontWeight:'bold', textWrap:'nowrap'}}>TOTAL : </Typography>
          <Typography variant='body2'>{totalFee}</Typography> 
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
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {idArr[rowsL - row.no]}
                    </TableCell>
                    <TableCell align="left" sx={{textWrap:'noWrap'}}>{row.name}</TableCell>
                    <TableCell align="left" sx={{textWrap:'noWrap'}}>{row.awb}</TableCell>
                    <TableCell align="left" sx={{textWrap:'noWrap'}}>{row.processingFee}</TableCell>
                   </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}