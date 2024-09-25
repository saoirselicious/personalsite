import React, { useState } from 'react';
import { redirectToSpotifyAuth } from '../Utilities/SpotifyAuth';
import { Container, Typography, Button, Box } from '@mui/material';
import Typewriter from './Typewriter';
import example from "../../images/projects/examples/sortihue.png"

const Sortihue: React.FC = () => {
    const [showImage, setShowImage] = useState(false);

    const handleLogin = () => {
        redirectToSpotifyAuth();
    };

    const handleShowImage = () => {
        setShowImage(prevShowImage=>(!prevShowImage));
    };

    return (
        <Container
            component="main"
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '2rem',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '1rem',
                    textAlign: 'center',
                }}
            >
                <Typewriter text=" .Welcome to Sortihue. We get the colour palettes of your spotify album art" speed={100} />
            </Box>
            <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                    marginTop: '500px',
                    marginBottom: '1rem',
                    borderRadius: 50,
                    textTransform: 'none',
                    fontSize: '16px',
                    padding: '10px 20px',
                    backgroundColor: '#1DB954'
                }}
            >
                Log in with Spotify
            </Button>

            <Button
                variant="outlined"
                onClick={handleShowImage}
                sx={{
                    marginBottom: '1.5rem',
                    borderRadius: 50,
                    textTransform: 'none',
                    fontSize: '16px',
                    padding: '10px 20px',
                    borderColor: 'var(--primary-color)',
                    color: 'var(--primary-color)'
                }}
            >
                Show Example Image
            </Button>

            {showImage && (
                <Box
                    component="img"
                    src={example}
                    alt="Example of Sortihue"
                    sx={{
                        height: '60%',
                        width: '60%',
                        marginBottom: '1.5rem'
                    }}
                />
            )}

            <Typography
                variant="body1"
                component="p"
                sx={{
                    fontSize: '14px',
                    color: 'gray',
                }}
            >
                Disclaimer: This app is currently non-functional due to Spotify's limitations. Please visit the contact page to ask Saoirse for approval to use the app, as only manually entered users may use it until Spotify have approved.
            </Typography>
        </Container>
    );
};

export default Sortihue;
