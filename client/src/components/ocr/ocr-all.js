// Internal imports
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

// Material UI imports
import {
    CircularProgress,
    Paper,
    Button,
    Typography,
    Container,
    Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// Internal imports
import ApiHelper from '../../helpers/api';
import CustomTable from '../../core/custom-table';

const styles = {
    paper: {
        width: "85%",
        padding: "15px",
        marginBottom: "10px"
    },
    linkButton: {
        textDecoration: "none"
    }
};

class OcrAll extends Component{
    constructor(props){
        super(props);
        this.state = {
            ocrs: [],
            loading: true
        }
        this.deleteOcr = this.deleteOcr.bind(this);
    }

    componentDidMount(){
        this.loadOcrs();
    }

    loadOcrs(){
        ApiHelper.get("ocr")
        .then(response => {
            if (response.data) {
                this.setState({
                    ocrs: response.data,
                    loading: false
                });
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
    }

    deleteOcr(event, ocrId){
        this.setState({ loading:false });
        ApiHelper.delete(`ocr/${ocrId}`)
        .then(response => {
            if (response.status === 200) {
                this.setState({ loading: false }, this.loadOcrs());
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
    }

    get loadingCircular(){
        return <CircularProgress color="primary"/>;
    }

    get noDataMessage(){
        return <Typography variant="h5" color="inherit">No ocr output has been created yet</Typography>
    }

    get formatedData(){
        const { ocrs } = this.state;

        return ocrs.map(ocr => {
            return {
                ID: ocr._id,
                InputFile: ocr.inputFile,
                CreatedAt: moment(ocr.createdAt).format("DD/MM/YYYY"),
                View: (<Link to={`/ocr/view/${ocr._id}`}>
                    <Button color="primary" variant="contained">View</Button>
                </Link>),
                Delete: (<Button color="primary" variant="contained" onClick={event => this.deleteOcr(event, ocr._id)}>Delete</Button>)
            }
        });
    }

    render(){
        const { ocrs, loading } = this.state;
        const { classes } = this.props;
        const labels = ["ID", "InputFile", "CreatedAt", "View", "Delete"];

        if (loading) {
            return this.loadingCircular;
        }

        return (
            <Container>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={10}>
                            <Typography component="h1" variant="h4">OCR</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/ocr/create" className={classes.linkButton}>
                                <Button color="primary" variant="contained">New OCR</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    {ocrs.length > 0 ? <CustomTable labels={labels} data={this.formatedData} /> : this.noDataMessage }
                </Paper>
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(OcrAll));