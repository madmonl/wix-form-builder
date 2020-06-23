import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { selectForms } from './FormsListSlice';

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

export default function FormsList() {
  const rows = useSelector(selectForms);
  const classes = useStyles();

  return (
    <div className="forms">
      <TableContainer className="forms__table" component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
               className="forms__table--header forms-list__cell">Form ID</StyledTableCell>
              <StyledTableCell
               className="forms__table--header forms-list__cell">Form Name</StyledTableCell>
              <StyledTableCell
               className="forms__table--header forms-list__cell">Form Submissions</StyledTableCell>
              <StyledTableCell
               className="forms__table--header forms-list__cell">Submit</StyledTableCell>
              <StyledTableCell
               className="forms__table--header forms-list__cell">Submissions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({
              id, title, submissions
            }) => (
              <StyledTableRow key={id}>
                <StyledTableCell className="forms-list__cell" component="th" scope="row">
                  <Typography color="textSecondary">
                    {id}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell className="forms-list__cell">{title}</StyledTableCell>
                <StyledTableCell className="forms-list__cell">{submissions.length}</StyledTableCell>
                <StyledTableCell className="forms-list__cell">
                  <Link className="link" to={`/forms/submit/${id}`}>
                    <Button 
                      className="button--link button--small" 
                      variant="contained"
                      color="secondary"
                    >Submit</Button>
                  </Link></StyledTableCell>
                <StyledTableCell className="forms-list__cell">
                  <Link 
                    className="link" 
                    to={`/forms/submissions/${id}`}
                  >                  
                    <Button 
                      color="secondary"
                      className="button--link button--small" 
                      variant="outlined"
                    >Submissions Page</Button>      
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
