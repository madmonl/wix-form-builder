import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { selectSubmissionsRows, selectSubmissionsHeader } from '../formsList/FormsListSlice';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function Submissions({ match }) {
  const { formID } = match.params;
  const header = useSelector((state) => selectSubmissionsHeader(state, formID));
  const rows = useSelector((state) => selectSubmissionsRows(state, formID));
  const classes = useStyles();

  return (
    <div className="forms">
      <TableContainer className="forms__table" component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {header.map(({ name, id }) => (
                <StyledTableCell
                  key={id}
                  className="forms__table--header forms-list__cell"
                >{name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ row, id }) => (
              <StyledTableRow key={id}>
                {row.map(({ submission, submissionID }) => (
                  <StyledTableCell key={submissionID} component="th" scope="row">
                    {submission}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
