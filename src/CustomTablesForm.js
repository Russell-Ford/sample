import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

export default class CustomTablesForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.data != undefined) {
    return (
      <div>
      <form>
        <label>
          Start:
          <input
            name="minNumber"
            type="number"
            value={this.props.data.minNumber}
            onChange={this.props.onChange} />
        </label>
        <br />
        <label>
          Increment:
          <input
            name="increment"
            type="number"
            value={this.props.data.increment}
            onChange={this.props.onChange} />
        </label>
        <br />
        <label>
          Max:
          <input
            name="maxNumber"
            type="number"
            value={this.props.data.maxNumber}
            onChange={this.props.onChange} />
        </label>
        <br />
        <label>
          Width:
          <input
            name="flexBasis"
            type="number"
            value={this.props.data.flexBasis}
            onChange={this.props.onChange} />
        </label>
        <br />
        <label>
          Start Direction:
          <select name="startDirection" value={this.props.data.startDirection} onChange={this.props.onChange}>
            <option value="LTR">LTR-up</option>
            <option value="RTL">RTL-up</option>
          </select>
        </label>
      </form>
      <Button onClick={this.props.onSave}>Save</Button>
      <Button onClick={this.props.onCancel}>Cancel</Button>
      </div>
    );
    } else {
      return null
    }
  }
}

ReactDOM.render(
  <CustomTablesForm />,
  document.getElementById('root')
);
