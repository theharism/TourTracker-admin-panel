import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: '_id',
    align: 'left',
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'tourDate',
    align: 'left',
    disablePadding: true,
    label: 'Tour Date'
  },
  {
    id: 'tourType',
    align: 'left',
    disablePadding: false,
    label: 'Tour Type'
  },
  {
    id: 'itinerary',
    align: 'left',
    disablePadding: false,
    label: 'Itinerary'
  },
  {
    id: 'guestCount',
    align: 'left',
    disablePadding: false,
    label: 'Guest Count'
  },
  {
    id: 'vehicle',
    align: 'left',
    disablePadding: false,
    label: 'Vehicle'
  },
  {
    id: 'prepayAmount',
    align: 'left',
    disablePadding: false,
    label: 'Prepay Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ data }) {
  const order = 'asc';

  const orderBy = 'tourDate';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))?.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={row._id}>
                  <TableCell component="th" id={labelId} scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{new Date(row.tourDate).toDateString()}</TableCell>
                  <TableCell>{row.tourType}</TableCell>
                  <TableCell>{row.itinerary}</TableCell>
                  <TableCell>{row.guestCount}</TableCell>
                  <TableCell>{row.vehicle}</TableCell>
                  <TableCell>
                    <NumericFormat value={row.prepayAmount} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
OrderTable.propTypes = { data: PropTypes.array };
