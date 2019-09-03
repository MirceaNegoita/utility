import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button, LinearProgress, CircularProgress } from "@material-ui/core";

class DirectoryDiff extends Component {
    constructor(props){
        super(props);
        this.state = {
            path1: [],
            path2: [],
            uploading1: false,
            uploading2: false,
            comparing: false,
            compared: false,
            path1Compared: {},
            path2Compared: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    getContent(path, uploading, styles, pathName) {
        switch (true) {
            case uploading:
                return <LinearProgress color="primary" />
            case path.length !== 0:
                return (
                    <div>
                        <p>Path: {path[0]}</p>
                        <ul>
                            {path && path.map((path, index) => {
                                if (index !== 0) {
                                    return (<li key={path}>{path}</li>)
                                }
                            })}
                        </ul>
                    </div>
                );
            default:
                return (
                    <div>
                        <h1 style={styles.label}>Path</h1>
                        <input
                            name={pathName}
                            onChange={this.onChange}
                            style={styles.input}
                            type="file"
                            id="contained-button-file"
                            accept="image/*"
                            webkitdirectory="" 
                            mozdirectory="" 
                            msdirectory="" 
                            odirectory="" 
                            directory="" 
                            multiple 
                            runat="server"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" size="large" component="span" style={styles.button}>
                                Select Path
                            </Button>
                        </label>
                    </div>
                )
        }
    }

    getCompareButton(styles) {
        let { path1, path2, comparing } = this.state

        if (comparing) {
            return <CircularProgress style={styles.cirularProgress} color="primary" />
        }

        if (path1.length !== 0 && path2.length !== 0) {
            return (
                <Button variant="contained" color="primary" size="large" style={styles.compareButton} onClick={this.onClick}>
                    Compare
                </Button>
            )
        }
    }

    getComparedContent(content, styles){
        let renderedContent = [];

        content.same.map(same => {
            renderedContent.push({color:"green", name: same})
        });

        content.different.map(different => {
            renderedContent.push({ color: "red", name: different})
        });
        
        const listItems = renderedContent.map((item) => 
            <li style={{backgroundColor:item.color}}>{item.name}</li>
        );

        return (
            <ul>
                {listItems}
            </ul>
        )
    }

    removeDups(array) {
        let unique = {};
        array.forEach(function (i) {
            if (!unique[i]) {
                unique[i] = true;
            }
        });

        return Object.keys(unique);
    }


    onChange(event){
        switch (event.target.name) {
            case "path1":
                this.setState({ uploading1: true })
                let theFiles1 = event.target.files;
                let relativePath1 = theFiles1[0].webkitRelativePath;
                let folder1 = relativePath1.split("/");
                
                this.setState({
                    path1: folder1,
                    uploading1: false
                }, console.log('done'))
                break;
            case "path2":
                this.setState({ uploading2: true })
                let theFiles2 = event.target.files;
                let relativePath2 = theFiles2[0].webkitRelativePath;
                let folder2 = relativePath2.split("/");

                this.setState({
                    path2: folder2,
                    uploading2: false
                }, console.log('done'))
                break;
            default:
                break;
        }
    }

    onClick(){
        this.setState({comparing:true});
        let {path1, path2} = this.state;
        let path1Compared = {
            same: [],
            different: [],
        }

        let path2Compared = {
            same: [],
            different: []
        }
        
        path1.map(element1 => {
            path2.map(element2 => {
                if (element1 === element2) {
                    path1Compared.same.push(element1);
                    path2Compared.same.push(element2);
                } else {
                    path1Compared.different.push(element1);
                    path2Compared.different.push(element2);
                }
            })
        });

        path1Compared.same = this.removeDups(path1Compared.same);
        path2Compared.same = this.removeDups(path1Compared.same);

        path1Compared.different = this.removeDups(path1Compared.different);
        path2Compared.different = this.removeDups(path2Compared.different);
        
        return this.setState({ comparing: false, compared: true, path1Compared, path2Compared });
    }

    render() {
        const {path1, path2, uploading1, uploading2} = this.state;

        const styles = {
            label: {
                textAlign: 'center'
            },
            paper: {
                width: '85%',
                padding: '15px',
                marginBottom: '10px',

            },
            input: {
                display: 'none'
            },
            button: {
                width: '40%',
                marginLeft: '30%',
                marginRight: '30%'
            },
            compareButton: {
                width: "40%",
                padding: "10px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: "18px"
            },
            cirularProgress: {
                padding: "10px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
            }
        }

        if (this.state.compared) {
            return(
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper>
                            {this.getComparedContent(this.state.path1Compared, styles)}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            {this.getComparedContent(this.state.path2Compared, styles)}
                        </Paper>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper>
                        {this.getContent(path1, uploading1, styles, "path1")}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        {this.getContent(path2, uploading2, styles, "path2")}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {this.getCompareButton(styles)}
                </Grid>
            </Grid>
        );
    };
}

export default DirectoryDiff;