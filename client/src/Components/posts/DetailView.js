import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, deletePost,Likes } from '../../Services/api'
import Comments from '../comments/Comments';

const DetailView = (props) => {
    const [user, setuser] = useState({})
    const getUser = async () => {
      const response = await fetch("http://localhost:8000/api/users/getuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      let json = await response.json();
      setuser(json.id);
    //   settoggle(prev => !prev)
      console.log(user)
    }
  
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
        icons: {
            float: 'right'
        },
        icon: {
            margin: 5,
            border: '1px solid #878787',
            padding: 5,
            borderRadius: 10,
            cursor: 'pointer'
        },
        heading: {
            fontSize: 30,
            fontWeight: 600,
            textAlign: 'center',
            margin: '50px 0px 10px 0px'
        },
        subheading: {
            color: '#878787',
            display: 'flex',
            margin: '20px 0',
            [theme.breakpoints.down('sm')]: {
                display: 'block'
            }
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        }
    }))

    const classes = useStyles();

    let history = useHistory()

    let params = useParams();
    const [dislikes,setdislikes]=useState(false)
    const [len,setlen] =useState(0)
    const [post, setpost] = useState({});
    const dislike= async () => {
        let data =await Likes(params.id,{userId:user})
        setdislikes(!dislikes)
        alert("Likes or dislikes")
        
    }
    const fetchData = async () => {
        let data = await getPost(params.id);
        console.log("data",data.likes.length)
        setlen(data.likes.length)
        setpost(data)
       
    }
    useEffect(() => {
        fetchData()

        // eslint-disable-next-line
    }, [dislikes])
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    useEffect(() => {
        fetchData()
        props.getUser()
        // eslint-disable-next-line
    }, [])

    const deleteBlog = async () => {
        await deletePost(params.id)
        alert("Deleted ")
        history.push('/')
    }

    return (
        <>
            <Box className={classes.container}>
                <img src={url} alt="" className={classes.image} />
                {
                    props.user === post.author ?
                        <Box className={classes.icons}>
                            <Link to={`/updatepost/${params.id}`}><Edit className={classes.icon} color="primary" /></Link>
                            <Delete className={classes.icon} color="error" onClick={deleteBlog} />
                        </Box> : ""
                }
                <Typography className={classes.heading}>{post.title}</Typography>
                <button class="btn btn-primary"onClick={dislike}>Likes  {len}</button>
                <Box className={classes.subheading}>
                    <Link to={`/posts/author/${post.author}`} className={classes.link} >
                        <Typography>Author: <span style={{ fontWeight: 600 }}>{post.author}</span></Typography>
                    </Link>
                    <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdAt).toDateString()}</Typography>
                </Box>
                <Typography>{post.description}</Typography>
                <Comments post={post} user={props.user} />
            </Box>
        </>
    )
}

export default DetailView
