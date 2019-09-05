// Internal imports
import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import moment from 'moment';

// Material-UI Imports
import {
    CircularProgress, 
    Paper, 
    Button, 
    Typography, 
    Container, 
    Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// Helpers Imports
import ApiHelper from '../../helpers/api';
import CustomTable from '../../core/custom-table';

const styles = {
    paper: {
        width: '85%',
        padding: '15px',
        marginBottom: '10px',

    },
    linkButton: {
        textDecoration: "none"
    }
};

class DiffAll extends Component{
    constructor(props){
        super(props);
        this.state = {
            sets: [],
            loading: true
        }
        this.deleteSet = this.deleteSet.bind(this);
    }

    componentDidMount(){
        this.loadSets();
    }

    loadSets(){
        ApiHelper.get("sets")
        .then(response => {
            if (response.data) {
                this.setState({
                    sets: response.data,
                    loading: false
                });
            }
        })
        .catch(error => {
            console.log("Error", error)
        });
    }

    deleteSet(event, setId){
        this.setState({loading:false});
        ApiHelper.delete(`sets/${setId}`)
        .then(response => {
            if (response.status === 200) {
                this.setState({ loading: false }, this.loadSets());
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
    }

    get loadingCircular(){
        return (<CircularProgress color="primary" />);
    }

    get noSetsMessage(){
        return (<Typography variant="h5" color="inherit">No sets have been created</Typography>);
    }

    get formatedData(){
        const { sets } = this.state;
        const { classes } = this.props;
        
        return sets.map(set => { 
            return { 
                ID: set._id, 
                Type: set.type,
                CreatedAt: moment(set.createdAt).format("DD/MM/YY"),
                View: (<Link to={"/sets/view/" + set._id} className={classes.linkButton}>
                    <Button color="primary" variant="contained">View</Button>
                </Link>),
                Delete: (<Button color="secondary" variant="contained" onClick={event => this.deleteSet(event, set._id)}>Delete</Button>) 
            }
         });
    }

    render(){
        const { sets, loading } = this.state;
        const { classes } = this.props;
        const labels = ["ID", "Type", "CreatedAt", "View", "Delete"];

        if (loading) {
            return this.loadingCircular;
        }

        return(
            <Container>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={10}>
                            <Typography component="h1" variant="h4">Sets</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/sets/create" className={classes.linkButton}>
                                <Button color="primary" variant="contained">New set</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    {sets.length > 0 ? <CustomTable labels={labels} data={this.formatedData} /> : this.noSetsMessage}
                </Paper>
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(DiffAll));