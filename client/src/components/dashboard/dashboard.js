// External imports
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

// Material UI imports
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

// Internal imports
import ApiHelper from '../../helpers/api';
import DashboardWidget from '../../core/dashboard-widget';
import { ErrorOutline } from '@material-ui/icons';

const styles = {
    errorMessage: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "48px",
        textAlign: "center"
    }
};

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            sets: [],
            ocrs: [],
        };
    }

    loadSets(){
        ApiHelper.get("sets")
        .then(response => {
            if (response.data) {
                this.setState({ sets: response.data });
            }
        })
        .catch(error => {
            throw error;
        });
    }

    loadOcrs(){
        ApiHelper.get("ocr")
        .then(response => {
            if (response.data) {
                this.setState({ ocrs: response.data });
            }
        })
        .catch(error => {
            throw error;
        });
    }

    componentDidMount(){
        this.loadSets();
        this.loadOcrs();
    }

    get formatedData(){
        const { sets, ocrs } = this.state;
        let elements = [];

        if (sets.length > 0) {
            elements.push({ header: "File Comparisons", section: "sets", data: sets });
        }

        if (ocrs.length > 0) {
            elements.push({ header: "OCR Results", section: "ocr", data: ocrs });
        }

        return elements;
    }

    get noWidgetsMessage(){
        const { classes } = this.props;

        return <Typography component="h1" className={classes.errorMessage}>No widgets to display</Typography>;
    }

    get widgets(){
        const elements = this.formatedData;

        return (
            <Grid container spacing={3}>
                {elements.map(element => (
                    <Grid key={element.section} xs={12 / elements.length} item={true}>
                        <DashboardWidget
                            key={element.section}
                            header={element.header}
                            section={element.section}
                            data={element.data} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    render(){
        const elements = this.formatedData;

        if (elements.length === 0) {
            return this.noWidgetsMessage
        }

        return this.widgets;
    }
}

export default withRouter(withStyles(styles)(Dashboard));