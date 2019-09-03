import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

const styles = {

};

class OcrWidget extends Component{
    render(){
        return (
            <p>OCR Widget</p>
        );
    }
}

export default withRouter(withStyles(styles)(OcrWidget));
