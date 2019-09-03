// External imports
import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';

// Material UI imports
import { Container, TextField, Typography, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// Internal imports
import AuthHelper from '../../helpers/auth';
import ApiHelper from '../../helpers/api';

const styles = {
    heading: {
        textAlign: "center"
    },
    message: {
        color: "red",
        textAlign: "center"
    }
};

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            message: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onClick(){
        const { name, email, password } = this.state;

        if (name === "") return this.setState({message: "Name is required"}); 
        if (email === "") return this.setState({ message: "Email is required" });
        if (!AuthHelper.validateEmail(email)) return this.setState({ message: "Invalid email address" });
        if (password === "") return this.setState({ message: "Password is required" });
        
        ApiHelper.post("auth/register", { name, email, password }).then(response => {
            if (response.status === 200) {
                this.props.history.push("/login");
            }
        }).catch(error => {
            return this.setState({ message: "Server error" });
        });
    }

    get errorMessage(){
        return (
            <Typography component="h1" variant="h5" style={{color:"red", textAlign:"center"}}>{this.state.message}</Typography>
        )
    }

    render(){
        return(
            <Container>
                <Typography component="h1" variant="h5" style={styles.heading}>Register</Typography>
                {this.errorMessage}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={this.onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.onChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.onClick}
                >
                    Register
                </Button>

                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(Register));