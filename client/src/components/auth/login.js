// Internal imports
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Material UI imports
import { Container, TextField, Typography, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// Internal imports
import AuthHelper from '../../helpers/auth';
import ApiHelper from '../../helpers/api';

const styles = {
    heading: {
        textAlign: "center"
    }
};

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onClick(event){
        const { email, password } = this.state;

        if(email === "") return this.setState({message: "Email is required"});
        if (!AuthHelper.validateEmail(email)) return this.setState({ message: "Invalid email address" });
        if(password === "") return this.setState({message: "Password is required"});

        ApiHelper.post("auth/login", { email, password }).then(response => {
            if (response.data) {
                localStorage.setItem("token", response.data);
                this.props.history.push("/");
            }
        }).catch(error => {
            this.setState({ message: "Invalid credentials" });
        });
    }

    get errorMessage() {
        return (
            <Typography component="h1" variant="h5" style={{ color: "red", textAlign: "center" }}>{this.state.message}</Typography>
        )
    }

    render() {
        return (
            <Container>
                <Typography component="h1" variant="h5" style={styles.heading}>Log In</Typography>
                {this.errorMessage}
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
                        Log In
                </Button>
                
                <Grid container>
                    <Grid item>
                        <Link to="/register">
                            {"Don't have an account? Register"}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(Login));