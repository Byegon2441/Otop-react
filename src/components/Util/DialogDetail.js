import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Auth,{Url} from './AuthService'
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
    constructor(props){
        super(props);
        this.Auth = new Auth();

    }
  state = {
    open: false,
    
  };

  handleClickOpen =async () => {
    await this.Auth.fetch(`${Url}/api/user/getProduct/${this.props.keyid}`,{method:"GET"})
    .then(async res=>{
        console.log(res);
        var arr3 = Object.values(res[0]);
        await this.setState({open: true,datasource:res[0],dataarr:arr3})

        console.log(this.state.datasource)
        console.log(arr3)
        console.log(this.state.dataarr);
        
    })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  
  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Open dialog
        </Button> */}
        <button className="btn btn-block btn-secondary title" onClick={this.handleClickOpen}> ดูรายละเอียด </button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            รายละเอียดสินค้า
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              My Key = {this.props.keyid}
              <br/>
              {this.state.dataarr ? 
                <div className="text-center">
                    <p>กลุ่มการค้า {this.state.dataarr[8] }</p>
                    <p>ประเภทสินค้า {this.state.dataarr[10] }</p>
                    <p>รายละเอียดสินค้า {this.state.dataarr[1] }</p>
                    <p>จำนวนสินค้า {this.state.dataarr[4] } ชิ้น</p>

                </div>
                : 
                <p>Loading...</p>}
              
            </Typography>

  
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
              Save changes
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogDemo;