import React, { Component } from 'react'

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
export default class Selected extends Component {


  render() {
      if(this.props.datasource){
          if (this.props.size == "FullWidth") {
              console.log('MY STATE SELECT'+this.props.state)
              return (
                  <div>
                      <InputLabel htmlFor={this.props.value}>{this.props.nameShow} </InputLabel>
                      <Select
                          value={this.props.state}
                          onChange={this.props.fnc}
                          name={this.props.name}
                          margin="dense"
                          fullWidth
                      >
                          {
                              this.props.datasource.map(e => {
                                  return <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                              })
                          }
                      </Select>
                  </div>
              )
          } else {
              return (
                  <div>
                      <InputLabel htmlFor={this.props.value}>{this.props.nameShow} </InputLabel>
                      <Select
                          value={this.props.state}
                          onChange={this.props.fnc}
                          name={this.props.name}
                          margin="dense"
                      >
                          {
                              this.props.datasource.map(e => {
                                  return <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                              })
                          }
                      </Select>
                  </div>
              )
          }

      }else{
        return <div></div>
      }
    
  }
}
