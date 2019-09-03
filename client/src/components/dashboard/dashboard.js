import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core';

const styles = {

};

class Dashboard extends Component{
    render(){
        return (
            <p>Dashboard view</p>
        );
    }
}

export default withRouter(withStyles(styles)(Dashboard));