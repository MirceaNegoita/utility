// Internal imports
import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import moment from 'moment';

// Material-UI Imports
import {
    CircularProgress, 
    Paper, 
    Table ,
    TableHead, 
    TableBody, 
    TableCell, 
    TableRow, 
    Button, 
    Typography, 
    Container, 
    Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// Helpers Imports
import ApiHelper from '../../helpers/api';

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
        ApiHelper.get("sets").then(sets => {
            this.setState({
                sets: sets.data,
                loading: false
            });
        }).catch(error => {
            console.log("Error", error)
        })
    }

    deleteSet(event, setId){
        this.setState({loading:false});
        ApiHelper.delete(`sets/${setId}`).then(response => {
            if (response.status === 200) {
                this.setState({ loading: false }, this.loadSets());
            }
        }).catch(error => {
            console.log("Error", error);
        });
    }

    get loadingCircular(){
        return (<CircularProgress color="primary" />);
    }

    get noSetsMessage(){
        return (<Typography variant="h5" color="inherit">No sets have been created</Typography>);
    }

    get setsTable(){
        const {sets} = this.state;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Created On</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sets.map(set => (
                        <TableRow key={set._id}>
                            <TableCell>{set._id}</TableCell>
                            <TableCell>{set.type}</TableCell>
                            <TableCell>{moment(set.createdAt).format("DD/MM/YY")}</TableCell>
                            <TableCell>
                                <Link to={"/view/" + set._id} id={set._id} style={{textDecoration:"none"}}>
                                    <Button color="primary" variant="contained">View</Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Button color="secondary" variant="contained" onClick={event => this.deleteSet(event, set._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    render(){
        const {sets, loading} = this.state;

        if (loading) {
            return this.loadingCircular;
        }

        return(
            <Container>
                <Paper style={styles.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={10}>
                            <Typography component="h1" variant="h4">Sets</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/create" style={styles.linkButton}>
                                <Button color="primary" variant="contained">New set</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={styles.paper}>
                    {sets.length > 0 ? this.setsTable : this.noSetsMessage}
                </Paper>
            </Container>
        );
    }
}

export default withRouter(withStyles(styles)(DiffAll));