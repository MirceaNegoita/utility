import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

const styles= {

};
class DiffWidget extends Component{
    render(){
        return (
            <p>Diffs Widget</p>
        );
    }
}

export default withRouter(withStyles(styles)(DiffWidget));