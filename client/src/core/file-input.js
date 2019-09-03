// Internal imports
import React, { Component } from 'react';

// Material UI imports
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

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

class FileInput extends Component {
    render(){
        const { classes } = this.props;

        return (
            <Paper className={classes.inputPaper}>
                <div>
                    <h1 className={classes.label}>{this.props.label}</h1>
                    <input
                        name={this.props.name}
                        accept="text/*"
                        id={`contained-button-${this.props.name}`}
                        className={classes.input}
                        type="file"
                        multiple
                        onChange={this.props.onFileChange}
                    />
                    <label htmlFor={`contained-button-${this.props.name}`}>
                        <Button variant="contained" color="primary" size="large" component="span" className={classes.button}>
                            Upload
                        </Button>
                    </label>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(FileInput);