import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import { FormControl, InputBase, Button, TextareaAutosize } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, updatePost, uploadFile } from '../../Services/api';

const UpdateView = (props) => {

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

    let history = useHistory()

    const initialPost = {
        title: '',
        description: '',
        picture: '',
        author: props.user,
        categories: 'Tech'
    }

    let params = useParams()

    const [post, setpost] = useState({});
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

    const fetchData = async () => {
        let data = await getPost(params.id);
        setpost(data);
    }

    const updateBlog = async () => {
        await updatePost(params.id, post)
        history.push(`/postdetail/${params.id}`)
    }

    useEffect(() => {
        fetchData();
        props.getUser()
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value })
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
                    <InputBase name="title" value={post.title} placeholder="Title" className={classes.textField} onChange={(e) => handleChange(e)} />
                    <Button variant='contained' color='primary' onClick={updateBlog}>Update</Button>
                </FormControl>
                <TextareaAutosize
                    style={{ outline: 'none' }}
                    minRows={5}
                    placeholder="Tell Your Story"
                    className={classes.textarea}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    value={post.description}
                />
                {props.user}
            </Box>
        </>
    )
}

export default UpdateView
