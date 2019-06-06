import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class RadioButtons extends React.Component {
 

  render() {
    
    if(this.props.data){
        console.log(this.props.data);
        return (
            <div>
                <br></br>
                <FormLabel>{this.props.name} </FormLabel>
                <br/>
      
              {      
                  this.props.data.map(i =>{
                    return (
                        <FormControlLabel value={i.id} control={
                        <Radio
                            checked={this.props.myState == i.id}
                            onChange={this.props.onChange}
                            value={i.id}
                            name={this.props.nameVal}
                            aria-label="A"
                        />
                    } label={i.name} />
                    )
            })}
              
            </div>
          )
    }else{
        return <div></div>
    }

  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);