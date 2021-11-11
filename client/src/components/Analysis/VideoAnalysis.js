import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { sendvideodata } from '../../actions/videoAnalysis'
import { Typography, TextField, Button, Grid, Paper, CircularProgress, Fab } from '@mui/material';

import useStyles from './styles';



const VideoAnalysis = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [formData, setFormData] = useState({ meetingName: "", slotName: "", className: "", fileName: "video.mp4", file: null, })
    const [isSubmit, setIsSubmit] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState("");

    const [isResponse, setIsResponse] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('meetingName', formData.meetingName)
        data.append('slotName', formData.slotName)
        data.append('className', formData.className)
        console.log(formData.meetingName, "iiiiiiiiiiiiiiiii")
        data.append('fileName', formData.fileName)
        data.append('file', formData.file);
        dispatch(sendvideodata(data))
        setIsSubmit(true)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleUploadClick = (event) => {
        var newFile = (event.target.files[0] === undefined) ? null : event.target.files[0];
        var newFileName = (event.target.files[0] === undefined) ? "" : event.target.files[0].name;
        setFormData({ ...formData, file: newFile, fileName: newFileName });
        setSelectedFileName(newFileName);
    };

    const spinner = <div style={{ alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '8rem' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}>Analyzing Video!</Typography>
    </div>
    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={4} className={classes.leftGrid}>
                    {isSubmit ? spinner :
                        <div className={classes.paper}>
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <TextField className={classes.input} name='className' value={formData.className} onChange={handleChange} variant="outlined" required fullWidth label='Class Name' />
                                <TextField className={classes.input} name='meetingName' value={formData.meetingName} onChange={handleChange} variant="outlined" required fullWidth label='Meeting Name' />
                                <TextField className={classes.input} name='slotName' value={formData.slotName} onChange={handleChange} variant="outlined" required fullWidth label='Slot Name' />
                                <Typography style={{ marginLeft: '13rem', fontSize: '30px' }} className={classes.submit} fullWidth></Typography>

                                <>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                        id="contained-button-file"
                                        onChange={handleUploadClick}

                                    />
                                    <label htmlFor="contained-button-file" className={classes.input}>
                                        <Button variant="contained" color="primary" component="span">
                                            Upload
                                        </Button>

                                    </label>
                                    <input type='hidden' name="fileName" value={formData.fileName} onChange={handleChange} ></input>
                                    {selectedFileName === "" ? <Typography component="span" className={classes.input}>No File Chosen</Typography> :
                                        <Typography component="span" className={classes.input}>{selectedFileName}</Typography>}
                                </>
                                <Button style={{ marginLeft: '0.5rem' }} variant='contained' color='primary' size='large' type='submit' className={classes.submit} fullWidth>Submit</Button>

                            </form>
                        </div>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default VideoAnalysis;