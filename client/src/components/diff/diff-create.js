// Internal imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// Material UI imports
import { Container, Paper, Grid, Typography, TextField, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// External imports
import ApiHelper from '../../helpers/api';
import FolderInput from '../../core/folder-input';
import FileInput from '../../core/file-input';
import { COMPARISON_TYPES } from '../../utils/constants';

const styles = {
    label: {
        textAlign: 'center'
    },
    paper: {
        width: '85%',
        padding: '15px',
        marginBottom: '10px',

    },
    compareButton: {
        width: "40%",
        padding: "10px",
        display: "block",
        marginLeft: "21%",
        marginRight: "auto",
        fontSize: "18px"
    },
};

class DiffCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: "files",
            firstFile: undefined,
            secondFile: undefined
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onCompareFilesClick = this.onCompareFilesClick.bind(this);
        this.getFilesFromType = this.getFilesFromType.bind(this);
    }

    handleTypeChange(event){
        this.setState({
            [event.target.name] : event.target.value,
            firstFile: null,
            secondFile: null
        });
    }

    getFilesFromType(event){
        if (this.state.type === "folders") {
            return event.target.files;
        }
        
        return event.target.files[0];
    }

    onFileChange(event){
        let file = this.getFilesFromType(event);

        console.log("Name", event.currentTarget);
        console.log("File", file);
        
        this.setState({ [event.target.name] : file });
    }

    getFolderList(folder){
        let folderList = "";

        for (let index = 0; index < folder.length; index++) {
            folderList = folderList.concat(folder[index].webkitRelativePath+"\n");
        }

        return folderList;
    }

    onCompareFilesClick(event){
        const { firstFile, secondFile, type } = this.state;
        
        let data = new FormData();
        data.append("firstFile", type === COMPARISON_TYPES.folders ? this.getFolderList(firstFile) : firstFile);
        data.append("secondFile", type === COMPARISON_TYPES.folders ? this.getFolderList(secondFile) : secondFile);
        data.append("type", type);

        ApiHelper.post("sets/create", data)
        .then(response => {
            if (response.data) {
                this.props.history.push(`view/${response.data.id}`);
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
    }

    checkIfCompareButtonShouldBeDisabled(){
        if (this.state.firstFile && this.state.secondFile) {
            return false;
        }
        return true;
    }

    getFileName(file){
        if (this.state[file]) {
            return this.state[file].name;
        }

        return "File";
    }

    getFolderName(folder){
        if (this.state[folder]) {
            return this.state[folder][0].webkitRelativePath.split("/")[0];
        }

        return "Folder";
    }

    get inputsByType(){
        const { classes } = this.props;
        const { type } = this.state;

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    {type === COMPARISON_TYPES.folders
                        ? <FolderInput
                            name="firstFile"
                            label={this.getFolderName("firstFile")}
                            onFileChange={this.onFileChange}
                        />
                        : <FileInput
                            label={this.getFileName("firstFile")}
                            name="firstFile"
                            onFileChange={this.onFileChange}
                        />}
                </Grid>
                <Grid item xs={6}>
                    {type === COMPARISON_TYPES.folders
                        ? <FolderInput
                            name="secondFile"
                            label={this.getFolderName("secondFile")}
                            onFileChange={this.onFileChange}
                        />
                        : <FileInput
                            label={this.getFileName("secondFile")}
                            name="secondFile"
                            onFileChange={this.onFileChange}
                        />}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" className={classes.compareButton} onClick={this.onCompareFilesClick} disabled={this.checkIfCompareButtonShouldBeDisabled()}>
                        Compare
                    </Button>
                </Grid>
            </Grid>
        );
    }

    get header(){
        const { classes } = this.props;
        const { type } = this.state;

        return (
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Typography component="h1" variant="h5">New set</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            select
                            name="type"
                            label="Type"
                            fullWidth
                            value={type}
                            onChange={this.handleTypeChange}>
                            <MenuItem key={1} value="files">
                                Files
                                </MenuItem>
                            <MenuItem key={2} value="folders">
                                Folders
                                </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    render(){
        return(
            <Container>
                {this.header}
                {this.inputsByType}
            </Container>
        )
    }
}

export default withRouter(withStyles(styles)(DiffCreate));