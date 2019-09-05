// Internal imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        const { classes, label, name, onFileChange } = this.props;

        return (
            <Paper className={classes.inputPaper}>
                <div>
                    <h1 className={classes.label}>{label}</h1>
                    <input
                        name={name}
                        accept="text/*"
                        id={`contained-button-${name}`}
                        className={classes.input}
                        type="file"
                        multiple
                        onChange={onFileChange}
                    />
                    <label htmlFor={`contained-button-${name}`}>
                        <Button variant="contained" color="primary" size="large" component="span" className={classes.button}>
                            Upload
                        </Button>
                    </label>
                </div>
            </Paper>
        );
    }
}

FileInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onFileChange: PropTypes.func
}

export default withStyles(styles)(FileInput);