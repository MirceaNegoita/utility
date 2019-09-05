// External imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI imports
import { withStyles } from '@material-ui/styles';
import { ListItem, ListItemText, ListItemIcon, ListSubheader, List, Paper, Typography } from '@material-ui/core';
import { FileCopy, Visibility, Apps } from '@material-ui/icons';

// Internal imports
import { WIDGET_TYPES } from '../utils/constants';

const styles = {
    root: {
        width: "100%",
        maxWidth: 360,
        maxHeight: 300,
        minHeight: 100,
        backgroundColor: "#fafafa",
        position: "relative",
        overflow: "auto",
    },
    link: {
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.54)"
    }
};

class DashboardWidget  extends Component{
    get listIcon(){
        const { section } = this.props;

        switch (section) {
            case WIDGET_TYPES.sets:
                return <FileCopy/>;
            case WIDGET_TYPES.ocrs:
                return <Visibility/>;
            default:
                return <Apps/>;
        }
    }

    get listOfData(){
        const { header, section, data, classes } = this.props;

        return (
            <List subheader={<ListSubheader>{header}</ListSubheader>}>
                {data.map((element, index) => {
                    return (
                        <Link to={`/${section}/view/${element._id}`} key={element._id} className={classes.link}>
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    {this.listIcon}
                                </ListItemIcon>
                                <ListItemText primary={element._id} />
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        );        
    }

    get noDataMessage(){
        return (<Typography component="p">No data found</Typography>);
    }

    render(){
        const { data, classes } = this.props;

        return (
            <Paper className={classes.root}>
                { data.length > 0 ? this.listOfData : this.noDataMessage}             
            </Paper>
        );
    }
}

DashboardWidget.propTypes = {
    header: PropTypes.string,
    section: PropTypes.string,
    data: PropTypes.array
};

export default withStyles(styles)(DashboardWidget);