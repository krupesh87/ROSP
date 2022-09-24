import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Banner from '../home/Banner'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router'
import Post from './Post'
import { categoryPosts } from '../../Services/api'
import { Link } from 'react-router-dom'

const CategoryPosts = () => {

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

    let params = useParams();

    // let posts = [1, 2, 3, 4, 5, 6]

    const [posts, setposts] = useState([])

    const fetchData = async () => {
        let data = await categoryPosts(params.category);
        setposts(data)
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Banner /> <br />
            <Typography variant="h4" className={classes.heading}>{params.category} Posts</Typography> <br /><br />
            <Grid container>
                {
                    posts && posts.map((post) => {
                        let description = post.description;
                        let title = post.title;
                        let titledata
                        let data
                        if (description.length > 100) {
                            data = description.slice(0, 100)
                        }
                        else {
                            data = description
                        }
                        if (title.length > 20) {
                            titledata = title.slice(0, 20)
                        }
                        else {
                            titledata = title;
                        }
                        return (
                            <Grid key={post._id} item lg={4} sm={6} xs={12}>
                                <Link to={`/postdetail/${post._id}`} className={classes.link} >
                                    <Post key={post._id} post={post} title={titledata} description={data} picture={post.picture ? post.picture : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"} categories={post.categories} author={post.author} createdAt={post.createdAt} />
                                </Link>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </>
    )
}

export default CategoryPosts
