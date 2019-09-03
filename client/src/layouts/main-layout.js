// External Imports
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

// Material-UI components and icons
import {  
    Button, 
    Drawer, 
    CssBaseline, 
    AppBar, 
    Toolbar, 
    List, 
    Typography, 
    Divider, 
    ListItem, 
    ListItemIcon, 
    ListItemText 
} from '@material-ui/core';
import {
    Apps,
    Visibility,
    FileCopy
} from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

// Internal imports
import JwtHelper from '../helpers/jwt';

const drawerWidth = 240;

const styles = {
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: 1300
    },
    drawer: {
        width: `${drawerWidth}px`,
        flexShrink: 0,
        zIndex: 1299
    },
    drawerPaper: {
        width: "240px",
    },
    content: {
        flexGrow: 1,
        backgroundColor: "#00000",
        padding: "100px 50px 50px 50px",
    },
    list: {
        position: "relative",
        top: "73px"
    },
    link: {
        textDecoration: "none",
        color: "#000"
    },
    logoutButton: {
        position: "absolute",
        right: "0px"
    }
};

class MainLayout extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        const jwt = JwtHelper.getJwt();

        if (!jwt || jwt === "") {
            this.props.history.push("/login");
        }
    }

    logout(){
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    get appBar(){
        const { classes } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Utility
                        </Typography>
                    <Button color="inherit" className={classes.logoutButton} onClick={this.logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        );
    }

    get sideBar(){
        const { classes } = this.props;

        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <div className={classes.list}>
                    <Divider />
                    <List>
                        <Link to="/" className={classes.link} disabled>
                            <ListItem button key="sets">
                                <ListItemIcon><Apps/></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        <Divider/>
                        <Link to="/sets" className={classes.link}>
                            <ListItem button key="sets">
                                <ListItemIcon><FileCopy/></ListItemIcon>
                                <ListItemText primary="Compare Files" />
                            </ListItem>
                        </Link>
                        <Divider/>
                        <Link to="/ocr" className={classes.link}>
                            <ListItem button key="ocr">
                                <ListItemIcon><Visibility/></ListItemIcon>
                                <ListItemText primary="OCR" />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                </div>
            </Drawer>
        );

    }

    render(){
        const { classes, children } = this.props

        return (
            <div className={classes.root}>
                <CssBaseline />
                {this.appBar}
                {this.sideBar}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(MainLayout));
