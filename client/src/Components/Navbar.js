import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import { AccountCircle } from '@material-ui/icons'

const Navbar = (props) => {

    const useStyles = makeStyles({
        root: {
            backgroundImage: `url(${"https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"})`,
            backgroundSize: 'cover',
            color: 'white',
            justifyContent: 'center',
            '&>*': {
                padding: 20
            }
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        username: {
            display: 'inline-block',
            position: 'relative',
            left: 420

        },
        usernamelogo: {
            display: 'inline-block',
            position: 'relative',
            left: 400,
            top: 6
        }
    });

    const classes = useStyles();

    const history = useHistory();

    const [user, setuser] = useState({})

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/')
        props.settoggle(prev => !prev)
    }

    const getUser = async () => {
        const response = await fetch("http://localhost:8000/api/users/getuser", {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });
        let json = await response.json();
        setuser(json);
    }

    useEffect(() => {
        getUser();
    }, [props.toggle])

    return (
        <>
            <Box>
                <AppBar style={{ boxShadow: 'none' }}>
                    <Toolbar className={classes.root}>
                        <Link to='/' className={classes.link}><Typography>Home</Typography></Link>
                        <Link to='/about' className={classes.link}><Typography>About</Typography></Link>
                        <Link to='/contact' className={classes.link}><Typography>Contact</Typography></Link>
                        {
                            !localStorage.getItem('token') ?
                                <Link to='/signin' className={classes.link}><Typography>Login</Typography></Link>
                                :
                                <Link to='/signin' className={classes.link} onClick={handleLogout}><Typography>Logout</Typography></Link>
                        }
                        {
                            localStorage.getItem('token') ?
                                <Box>
                                    <span className={classes.usernamelogo}><AccountCircle fontSize="medium" /></span>
                                    <Typography variant="body1" className={classes.username} >{user.username}</Typography>
                                </Box> : ""
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar
