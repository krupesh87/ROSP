import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { makeStyles } from '@material-ui/styles';

const ActivationEmail = () => {

    const useStyles = makeStyles({
        para:{
            display: 'inline-block',
            position: 'relative',
            top: '200px',
            left: '300px'
        }
    })

    const classes = useStyles();

    return (
        <>
          <Box>
              <Typography variant="h4" className={classes.para}>Please Check Your Email an activation link has been send!!!.</Typography>
          </Box>  
        </>
    )
}

export default ActivationEmail
