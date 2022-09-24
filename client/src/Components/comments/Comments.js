import { Button } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import { TextareaAutosize } from '@mui/material'
import { makeStyles } from '@material-ui/styles';
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { getComments, newComment } from '../../Services/api';
import Comment from './Comment';

const Comments = (props) => {

    const useStyles = makeStyles({
        component: {
            marginTop: 100,
            display: 'flex'
        },
        textarea: {
            width: '100%',
            margin: '0 20px'
        },
        button: {
            height: 40
        }
    })

    const classes = useStyles();

    const initialValue = {
        name: '',
        postId: '',
        date: new Date(),
        comment: ''
    }

    let { post } = props;

    const [comment, setcomment] = useState(initialValue);

    const [comments, setcomments] = useState(null);

    const [toggle, settoggle] = useState(false)

    const handleChange = (e) => {
        setcomment({
            ...comment,
            name: props.user,
            postId: post._id,
            comment: e.target.value
        })
    }

    const postComment = async () => {
        await newComment(comment);
        setcomment({
            ...comment,
            name: '',
            postId: '',
            comment: ''
        })
        settoggle(prev => !prev);
    }

    const getComm = async () => {
        let response = await getComments(post._id);
        setcomments(response);
    }

    useEffect(() => {
        getComm();
        // eslint-disable-next-line
    }, [post, toggle])

    return (
        <>
            <Box>
                <Box className={classes.component}>
                    <Person fontSize="large" />
                    <TextareaAutosize
                        className={classes.textarea}
                        minRows={5}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button onClick={postComment} className={classes.button} variant="contained" color="primary" size="medium" >Post</Button>
                </Box>
                {
                    comments && comments.map((comm) =>
                        <Comment comment={comm} user={props.user} settoggle={settoggle} />
                    )
                }
            </Box>
        </>
    )
}

export default Comments
