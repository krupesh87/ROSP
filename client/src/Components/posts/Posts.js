import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Post from '../posts/Post'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { getAllPosts } from '../../Services/api'

const Posts = () => {

    // const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const useStyles = makeStyles({
        link: {
            textDecoration: 'none',
            color: 'inherit'
        }
    })

    const classes = useStyles();

    const [posts, setposts] = useState([])


    const fetchData = async () => {
        let data = await getAllPosts();
        setposts(data);
    }

    useEffect(() => {
        fetchData();
        // Category();
    }, [])

    return (
        <>
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
                        <Grid key={post._id} item lg={4} sm={4} xs={12}>
                            <Link to={`/postdetail/${post._id}`} className={classes.link} >
                                <Post post={post} id={post._id} title={titledata} description={data} picture={post.picture ? post.picture : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"} categories={post.categories} author={post.author} createdAt={post.createdAt} />
                            </Link>
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default Posts
