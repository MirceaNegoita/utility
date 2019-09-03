// Internal imports
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

// Material UI imports
import {
    CircularProgress,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Typography,
    Container,
    Grid
} from '@material-ui/core';
import { withStyles, mergeClasses } from '@material-ui/styles';

// Internal imports
import ApiHelper from '../../helpers/api';

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

    get ocrTable(){
        const { ocrs } = this.state;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>FileName</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ocrs.map(ocr => (
                        <TableRow key={ocr._id}>
                            <TableCell>{ocr._id}</TableCell>
                            <TableCell>{ocr.inputFile}</TableCell>
                            <TableCell>{moment(ocr.createdAt).format("DD/MM/YY")}</TableCell>
                            <TableCell>
                                <Link to={`/ocr/view/${ocr._id}`}>
                                    <Button color="primary" variant="contained">View</Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link>
                                    <Button color="primary" variant="contained" onClick={event => this.deleteOcr(event, ocr._id)}>Delete</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    render(){
        const { ocrs, loading } = this.state;
        const { classes } = this.props;

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
                    {ocrs.length > 0 ? this.ocrTable : this.noDataMessage }
                </Paper>
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(OcrAll));