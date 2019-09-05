// External imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material-ui imports
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell 
} from '@material-ui/core';


class CustomTable extends Component {
    render(){
        const props = this.props;
        
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {props.labels.map(label => (<TableCell key={label}>{label}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((element, index) => (
                        <TableRow key={index}>
                            {Object.keys(element).map((key, index) => (<TableCell key={index}>{element[key]}</TableCell>))}    
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

CustomTable.propTypes = {
    labels: PropTypes.array,
    data: PropTypes.array
};

export default CustomTable;