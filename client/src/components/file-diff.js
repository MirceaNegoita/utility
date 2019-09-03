import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactDiffViewer from 'react-diff-viewer';

class FileDiff extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstFile: "",
            secondFile: "",
            firstFileContent: "",
            secondFileContent: "",
            uploading1: false,
            uploading2: false,
            comparing: false,
            compared: false
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.resetCompare = this.resetCompare.bind(this);
    }

    getContent(file, uploading, styles, fileName, fileContent){
        switch (true) {
            case uploading:
                return <LinearProgress color="primary" />
            case file !== "":
                return (
                    <div>
                        <h1>File name: {file}</h1>
                        {fileContent.split("\n").map((i, key) => {
                            return <div key={key}>{i}</div>;
                        })}
                    </div>
                );
            default:
                return (
                    <div>
                        <h1 style={styles.label}>File</h1>
                        <input
                            name={fileName}
                            accept="text/*"
                            id="contained-button-file"
                            style={styles.input}
                            type="file"
                            multiple
                            onChange={this.onChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" size="large" component="span" style={styles.button}>
                                Upload
                            </Button>
                        </label>
                    </div>
                )
        }
    }

    getCompareButton(styles){
        let { firstFile, secondFile, comparing } = this.state

        if (comparing) {
            return <CircularProgress style={styles.cirularProgress} color="primary"/>
        }

        if (firstFile !== "" && secondFile !== "" && typeof firstFile !== "undefined" && typeof secondFile !== "undefined") {
            return(
                <Button variant="contained" color="primary" size="large" style={styles.compareButton} onClick={this.onClick}>
                    Compare
                </Button>
            )
        }
    }

    getComparedContent(){
        return (
            <Paper>
                <Button variant="contained" color="primary" size="large" onClick={this.resetCompare}>Reset </Button>
                <ReactDiffViewer
                    oldValue={this.state.firstFileContent}
                    newValue={this.state.secondFileContent}
                    splitView={true}
                />
            </Paper>
        );
    }

    resetCompare(){
        this.setState({
            firstFile: "",
            secondFile: "",
            firstFileContent: "",
            secondFileContent: "",
            uploading1: false,
            uploading2: false,
            comparing: false,
            compared: false
        })
    }

    onChange(event){
        switch (event.target.name) {
            case "firstFile":
                let file1 = event.target.files[0];
                let fileReader1 = new FileReader();
                let content1 = "";
                let extension = file1.name.split('.').pop();
                fileReader1.onload = () => {
                    content1 = fileReader1.result;
                }
                fileReader1.readAsText(file1);

                this.setState({uploading1:true});
                setTimeout(() => {
                    this.setState({
                        firstFile: file1.name,
                        firstFileContent: content1,
                        uploading1: false
                    })
                }, 3000)
                break;
            case "secondFile":
                let file2 = event.target.files[0];
                let fileReader2 = new FileReader();
                let content2 = "";
                fileReader2.onload = () => {
                    content2 = fileReader2.result;
                }
                fileReader2.readAsText(file2);
                this.setState({uploading2:true});
                setTimeout(() => {
                    this.setState({
                        secondFile: file2.name,
                        secondFileContent: content2,
                        uploading2: false
                    })
                }, 3000)
                break;
            default:
                break;
        }
    }

    onClick(){
        this.setState({comparing: true});
        setTimeout(() => {
            this.setState({comparing:false, compared: true});
        }, 3000)
    }

    render(){
        const {firstFile, secondFile,firstFileContent, secondFileContent ,uploading1, uploading2} = this.state;

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
            button : {
                width : '40%',
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
            return (this.getComparedContent());
        }

        return(
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper style={styles.paper}>
                        {this.getContent(firstFile, uploading1, styles, 'firstFile', firstFileContent)}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={styles.paper}>
                        {this.getContent(secondFile, uploading2, styles, 'secondFile', secondFileContent)}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {this.getCompareButton(styles)}
                </Grid>
            </Grid>
        );
    };
}

export default FileDiff;