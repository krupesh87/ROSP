import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function Banner() {

    return (
        <>
        <br /><br />
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${"https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"})`,
                }}
            >
                {/* Increase the priority of the hero background image */}
                {<img style={{ display: 'none' }} src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg" alt="" />}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                AI the Future...
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione asperiores illum culpa aliquam fugit rerum amet, ex eligendi totam atque alias maxime excepturi expedita sint voluptas! Itaque reiciendis impedit odio?
                            </Typography>
                            <Link variant="subtitle1" href="#">
                                Continue reading...
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Banner;