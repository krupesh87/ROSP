import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { FormControl, InputBase, Button, TextareaAutosize, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { createPost, uploadFile } from '../../Services/api';
import { useHistory } from 'react-router';

const CreateView = (props) => {

    const useStyles = makeStyles(theme => ({
        image: {
            width: '100%',
            height: '50vh',
            objectFit: 'cover'
        },
        container: {
            padding: '0 100px',
            [theme.breakpoints.down('md')]: {
                padding: 0
            }
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10
        },
        textField: {
            flex: 1,
            margin: '0 30px',
            fontSize: 25
        },
        textarea: {
            width: '100%',
            marginTop: 50,
            border: 'none',
            fontSize: 18,
            "&: focus-visible": {
                outline: 'none'
            }
        }
    }))

    const classes = useStyles();

    let history = useHistory();

    const initialState = {
        title: '',
        description: '',
        picture: '',
        author: props.user,
        categories: ''
        // createdDate: new Date()
    }

    const [post, setpost] = useState(initialState)

    const [file, setFile] = useState('');

    const [imageurl, setimageurl] = useState('')

    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const image = await uploadFile(data);
            post.picture = image.data
            setimageurl(image.data)
        }
    }

    useEffect(() => {
        getImage()
        // eslint-disable-next-line
    }, [file])

    useEffect(() => {
        props.getUser()
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value })
    }

    const savePost = async (post) => {
        await createPost(post);
        history.push("/");
    }

    return (
        <>
            <Box className={classes.container}>
                <img className={classes.image} src={url} alt="" />
                <FormControl className={classes.form}>
                    <label htmlFor="fileInput">
                        <AddCircle style={{ cursor: 'pointer' }} className={classes.addIcon} fontSize="large" color="action" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <InputBase onChange={(e) => handleChange(e)} placeholder="Title" className={classes.textField} value={post.title} name='title' />
                    <Button variant='contained' color='primary' onClick={() => savePost(post)}>Publish</Button>
                </FormControl>
                <TextareaAutosize
                    value={post.description}
                    onChange={(e) => handleChange(e)}
                    name='description'
                    style={{ outline: 'none' }}
                    minRows={5}
                    placeholder="Tell Your Story"
                    className={classes.textarea}
                />
                <FormLabel component="legend">Category:</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="Music" name="categories" control={<Radio />} onChange={handleChange} label="Music" />
                    <FormControlLabel value="Movies" name="categories" control={<Radio />} onChange={handleChange} label="Movies" />
                    <FormControlLabel value="Sports" name="categories" control={<Radio />} onChange={handleChange} label="Sports" />
                    <FormControlLabel value="Tech" name="categories" control={<Radio />} onChange={handleChange} label="Tech" />
                    <FormControlLabel value="Fashion" name="categories" control={<Radio />} onChange={handleChange} label="Fashion" />
                    <FormControlLabel value="LifeStyle" name="categories" control={<Radio />} onChange={handleChange} label="LifeStyle" />
                </RadioGroup>
            </Box>
        </>
    )
}

export default CreateView
