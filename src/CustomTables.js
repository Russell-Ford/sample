import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import CustomTable from './CustomTable';
import CustomTablesForm from './CustomTablesForm';

export default class CustomTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: -1,
      colors: [
         {
          color: 'red',
          minNumber: 8,
          maxNumber: 28,
          increment: 1,
          flexBasis: 30,
          startDirection: "LTR"
      }, {
          color: 'blue',
          minNumber: 8,
          maxNumber: 27,
          increment: 1,
          flexBasis: 30,
          startDirection: "LTR"
      }, {
          color: 'green',
          minNumber: 8,
          maxNumber: 28,
          increment: 2,
          flexBasis: 30,
          startDirection: "LTR"
      }],
      previousFormValues: {
        color: 'red',
        minNumber: 8,
        maxNumber: 28,
        increment: 1,
        flexBasis: 30,
        startDirection: "LTR"
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState) => {
      const newItems = [...prevState.colors];
      newItems[this.state.selectedTable][name] = name == "startDirection" ? value : parseInt(value);
      return {colors: newItems};
    });
  }

  onEdit(tableIndex) {
    this.onCancel();
    this.setState((prevState) => {
      const newItems = [...prevState.colors];
      if(prevState.selectedTable != -1) {
        newItems[prevState.selectedTable] = Object.assign({}, prevState.previousFormValues);
      }
      const currentFormValues = Object.assign({}, this.state.colors[tableIndex]);
      return {colors: newItems, selectedTable: tableIndex, previousFormValues: currentFormValues};
    });
  }

  onSave() {
    this.setState({
      selectedTable: -1
    });
  }

  onCancel() {
    this.setState(prevState => {
      const newItems = [...prevState.colors];
      newItems[prevState.selectedTable] = Object.assign({}, prevState.previousFormValues);
      return {colors: newItems, selectedTable: -1};
    });
  }



  createStyles() {
    const styles = this.state.colors.map((value) => {
      return {
        border: '1px solid',
        borderColor: value.color,
        flexBasis: value.flexBasis,
        margin: '3px'
      }
    })
    return styles;
  }




  render() {
    const root = {
      width: '100%',
    };
    const classes = this.createStyles();
    const form =  (this.state.selectedTable != -1) ? <CustomTablesForm data={this.state.colors[this.state.selectedTable]} onChange={this.handleInputChange} onSave={this.onSave} onCancel={this.onCancel} /> : '';
    return (
      <div>
      <Box style={root} display="flex" flexWrap="wrap">
        { classes.map((value, index) => {
          if(index == 2) {
            return <Hidden smDown><CustomTable key={index} index={index} data={this.state.colors[index]} onEdit={this.onEdit}/></Hidden>
          } else {
            return <CustomTable key={index} index={index} data={this.state.colors[index]} onEdit={this.onEdit}/>
          }
        })}
      </Box>
      {form}
      </div>
    );
  }
}

ReactDOM.render(
  <CustomTablesForm />,
  document.getElementById('root')
);
