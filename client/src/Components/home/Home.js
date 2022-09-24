import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Posts from '../posts/Posts'
import Banner from './Banner'
import { makeStyles } from '@material-ui/styles'
import Categories from './Categories'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const Home = (props) => {

    const useStyles = makeStyles({
        heading: {
            display: 'inline-block',
            position: 'relative',
            left: 25,
            borderBottom: '2px solid grey',
            width: 400,
        },
        create: {
            display: 'inline-block',
            position: 'relative',
            left: 315,
            // borderBottom: '2px solid grey',
            width: 300
        },
        categories: {
            display: 'inline-block',
            position: 'relative',
            left: 315,
            borderBottom: '2px solid grey',
            width: 300,
            top: 50
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        }
    })

    const classes = useStyles();

    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/signin');
        }
        else {
            history.push('/')
            props.getUser()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Banner />
            <br />
            <Grid container>
                <Grid item lg={6} sm={6} xs={5}>
                    <Typography variant="h4" className={classes.heading}>POSTS</Typography>
                </Grid>
                <Grid item lg={6} sm={6} xs={6}>
                    <Link to="/createpost" className={classes.link}> <Button variant="contained" color="primary" className={classes.create} >Create Post</Button></Link><br />
                    <Typography variant="h4" className={classes.categories}>CATEGORIES</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid container item lg={8} sm={10} xs={12}>
                    <Posts />
                </Grid>
                <Grid container item lg={3} sm={2} xs={12}>
                    <Categories />
                </Grid>
            </Grid>
        </>
    )
}

export default Home
