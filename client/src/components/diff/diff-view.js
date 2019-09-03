// External impornts
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactDiffViewer from 'react-diff-viewer';
import moment from 'moment';

// Material Ui
import { Paper, CircularProgress, Container, Typography, withStyles } from '@material-ui/core';

// Internal imports
import ApiHelper from '../../helpers/api';


const styles = {
    paper: {
        width: "85%",
        padding: "15px",
        marginBottom: "10px",

    },
    header: {
        textAlign: "center"
    }
};

class DiffView extends Component{
    constructor(props){
        super(props);
        this.state = {
            set: null,
            firstValue: "",
            secondValue: "",
            loading: true
        }
    }

    componentDidMount(){
        const { match } = this.props;

        ApiHelper.get(`sets/${match.params.id}`)
        .then(response => {
            if (response.data) {
                this.setState({
                    set: response.data.set,
                    firstValue: response.data.set.firstFile.content,
                    secondValue: response.data.set.secondFile.content,
                    loading: false
                });
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
    }

    get setDetails(){
        const { classes } = this.props;
        const { set } = this.state;

        return (
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.header}>{set._id}</Typography>
                <p><span><b>Type:</b></span>{set.type}</p>
                <p><span><b>First file:</b></span>{set.firstFile.name}</p>
                <p><span><b>Second file:</b></span>{set.secondFile.name}</p>
                <p><span><b>Created at:</b></span>{moment(set.createdAt).format('DD/MM/YYYY')}</p>
            </Paper>
        );
    }

    get setDiff(){
        const { classes } = this.props;
        const { firstValue, secondValue } = this.state;

        return (
            <Paper className={classes.paper}>
                <ReactDiffViewer
                    oldValue={firstValue}
                    newValue={secondValue}
                    splitView={true}
                />
            </Paper>
        );
    }

    render(){
        const { loading } = this.state;

        if (loading) {
            return(<CircularProgress color="primary"></CircularProgress>)
        }
        
        return (
            <Container>
                {this.setDetails}
                {this.setDiff}
            </Container>
        );    
    }
}

export default withRouter(withStyles(styles)(DiffView));