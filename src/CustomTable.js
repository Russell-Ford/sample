import React from 'react';
import ReactDOM from 'react-dom';
import CustomTablesForm from './CustomTablesForm';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

export default class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  createStyle() {
    const style =  {
      border: '1px solid',
      borderColor: this.props.data.color,
      flexBasis: this.props.data.flexBasis + "%",
      margin: '1px'
    }
    return style;
  }
  createRowsFromProps() {
    return this.createRows(this.props.data.minNumber,
      this.props.data.maxNumber,
      this.props.data.increment,
      this.props.data.startDirection)
  }

  createRows(start, end, inc, rtl) {
    if(start != '' && end != '' && inc != '' && rtl != '') {
    let data = [];
    let row = [];
    let count = 0;
    rtl = rtl == 'RTL' ? true : false;
    for(let i = start; i <= end; i += inc) {
      if(count == 5) {
        rtl ? data.push(row.reverse()) : data.push(row);
        row = [];
        count = 0;
        rtl = !rtl;
      }
      row.push(i);
      count += 1;
      if (i + inc > end) {
        rtl ? data.push(row) : data.push(row.reverse());
        while(data[data.length - 1].length < 5) {
          rtl ? data[data.length - 1].push(null) : data[data.length - 1].unshift(null);
        }
      }
    }
    return data.reverse();

    } else {
      return [];
    }
  }

  onEdit() {
    this.props.onEdit(this.props.index);
  }

  render() {
    const style = this.createStyle();
    const data = this.createRowsFromProps();
    return (
      <Paper style={style}>
        <Table>
          <TableBody>
            {data.map(row => (
              <TableRow>
                {row.map(col => (
                  <TableCell style={{backgroundColor: col == null ? 'gray' : 'white'}}>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={this.onEdit.bind(this)}>Edit</Button>
      </Paper>
    );
  }
}

ReactDOM.render(
  <CustomTablesForm />,
  document.getElementById('root')
);
