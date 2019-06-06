import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {Link} from 'react-router-dom'
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
          caret
          className="text-success"
        >
        <Link className="text-success" to="#">{this.props.name}</Link>
        </DropdownToggle>
        <DropdownMenu>
        {this.props.datasource.map(e => {
            return <div><Link className="text-success" to={e.Link} >{e.name}</Link></div>
        })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}