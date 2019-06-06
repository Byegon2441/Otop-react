import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthService,{Url} from '../Util/AuthService'


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Username: '',
            Password: '',
            
            open: false,
            status:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    componentDidMount(){
        
    }
    
    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/');
        }
    }

    handleClickOpen = async () => {

            this.setState({ open: true });

    };

    handleClose = () => {
        this.setState({ open: false });
    };

    async handleChange(e){
         console.log(e.target.value + '|' + e.target.name)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleFormSubmit(e){
        e.preventDefault();

            this.Auth.login(this.state.Username,this.state.Password)
            .then(res=>{
                if(res.result=='Success'){
                    this.Auth.setToken(res.Token)
                    this.Auth.setRole(res.role)
                    this.setState({
                        Username: '',
                        Password: '',
                        open: false,
                    })
                }
                alert(res.data);
            })
            .catch(err =>{
                alert(err);
            })      
    }

    render() {
        return <div>
            <div className="list-inline-item title" onClick={this.handleClickOpen}>
              {this.props.name}
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">
                {this.props.name}
              </DialogTitle>
              <DialogContent>
              
                <TextField autoFocus margin="dense" name="Username" label="Username" type="text" value={this.state.Username} onChange={this.handleChange} fullWidth />
                <TextField margin="dense" name="Password" label="Password" type="Password" value={this.state.Password} onChange={this.handleChange} fullWidth />

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  ยกเลิก
                </Button>
                <Button onClick={this.handleFormSubmit} color="primary" type='submit'>
                  {this.props.name}
                </Button>
                
              </DialogActions>
            </Dialog>
          </div>;
    }
   
    
}
export default Login