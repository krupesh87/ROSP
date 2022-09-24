import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { deleteComment } from '../../Services/api';

const Comment = (props) => {

    let { comment, settoggle } = props;

    const useStyles = makeStyles({
        component: {
            marginTop: 30,
            backgroundColor: '#f5f5f5',
            padding: '10px'
        },
        container: {
            display: 'flex',
            marginBottom: 5
        },
        name: {
            fontSize: 18,
            fontWeight: 600,
            marginRight: 20
        },
        date: {
            fontSize: 14,
            color: '#878787'
        },
        delete: {
            marginLeft: 'auto',
            cursor: 'pointer'
        }
    })

    const removeComment = async (id) => {
        await deleteComment(id);
        settoggle(prev=>!prev);
    }

    const classes = useStyles();

    return (
        <>
            <Box className={classes.component}>
                <Box className={classes.container}>
                    <Typography className={classes.name}>{comment.name}</Typography>
                    <Typography className={classes.date}>{new Date(comment.createdAt).toLocaleString()}</Typography>
                    {
                        props.user === comment.name ?
                        <Delete onClick={() => removeComment(comment._id)} className={classes.delete} />
                        : ""
                    }
                </Box>
                <Typography>{comment.comment}</Typography>
            </Box>
        </>
    )
}

export default Comment
