// Internal imports
import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/styles';
import { Paper, Button } from '@material-ui/core';

const styles = {
    inputPaper: {
        width: "70%",
        padding: "15px",
        marginBottom: "10px"
    },
    label: {
        textAlign: 'center'
    },
    input: {
        display: "none"
    },
    button: {
        width: '40%',
        marginLeft: '30%',
        marginRight: '30%'
    },
};

class FolderInput extends Component{
    render(){
        const { classes } = this.props;

        return (
            <Paper className={classes.inputPaper}>
                <h1 className={classes.label}>{this.props.label}</h1>
                <input
                    name={this.props.name}
                    onChange={this.props.onFileChange}
                    className={classes.input}
                    type="file"
                    id={`contained-button-${this.props.name}`}
                    accept="image/*"
                    webkitdirectory=""
                    mozdirectory=""
                    msdirectory=""
                    odirectory=""
                    directory=""
                    multiple
                    runat="server"
                />
                <label htmlFor={`contained-button-${this.props.name}`}>
                    <Button variant="contained" color="primary" size="large" component="span" className={classes.button}>
                        Upload
                    </Button>
                </label>
            </Paper>
        );
    }
}

export default withStyles(styles)(FolderInput);



