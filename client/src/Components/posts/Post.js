import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Post = (props) => {

    const useStyles = makeStyles({
        container: {
            height: 350,
            margin: 11,
            border: '1px solid #D3CEDE',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '&>*': {
                padding: '0 5px 5px 5px'
            }
        },
        image: {
            height: 170,
            width: '100%',
            objectFit: 'cover',
            borderRadius: '10px 10px 0 0'
        },
        category: {
            backgroundColor: 'lightgreen',
            color: 'white',
            border: '1px solid lightgreen',
            borderRadius: 5,
            marginTop: 2,
            fontWeight: 600,
            // padding: "5px 5px"
        },
        heading: {
            fontSize: 18,
            fontWeight: 600,
            textAlign: 'center'
        },
        author: {
            display: 'inline-block',
            position: 'relative',
            right: 50,
            color: 'grey'
        },
        date: {
            display: 'inline-block',
            position: 'relative',
            left: 50,
            color: 'grey'
        },
        detail: {
            fontSize: 14,
            wordBreak: 'break-word',
            // textAlign: 'center'
        }
    })

    const classes = useStyles();

    return (
        <>
            <Box className={classes.container}>
                <img className={classes.image} src={props.picture} alt="" />
                <Typography className={classes.category}>{props.categories}</Typography>
                <Typography className={classes.heading} style={{ fontSize: 18, fontWeight: 600, }}>{props.title}...</Typography>
                <Box style={{ display: 'flex' }}>
                    <Typography className={classes.author} style={{ fontWeight: 200, fontSize: 15 }}>{props.author}</Typography>
                    <Typography className={classes.date} style={{ fontWeight: 200, fontSize: 15 }}>{new Date(props.createdAt).toLocaleDateString()}</Typography>
                </Box>
                <Typography className={classes.detail}>{props.description}...</Typography>
            </Box>
        </>
    )
}

export default Post
