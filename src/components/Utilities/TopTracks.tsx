import React, { useEffect, useState, useRef } from 'react';
import { redirectToSpotifyAuth } from './SpotifyAuth';
import { Container, Typography, Button, Box } from '@mui/material';

const TopTracks: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to keep track of the interval


    useEffect(() => {
        const fullText = ` Welcome to Sortihue\n\nWe will take your top 50 tracks and examine the artwork for each. \n\nThen we will tell you the 10 most frequent colours that appear in the artwork and what percentage can be attributed to which colour.`;
        let index = 0;

        const typeWriterEffect = () => {
            if (index < fullText.length) {
                index++;
                setDisplayText(prev => prev + fullText[index]);
            } else {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current); // Clear the interval once done
                }
            }
        };

        intervalRef.current = setInterval(typeWriterEffect, 50); // Adjust speed as needed

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // Cleanup interval on component unmount
            }
        };
    }, []);

    const handleLogin = () => {
        redirectToSpotifyAuth(); // Assumes this handles redirection
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
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    mb: 4,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontFamily: '"Courier New", Courier, monospace',
                        whiteSpace: 'pre-wrap',
                        fontWeight: 'bold',
                        mb: 2,
                    }}
                >
                    {displayText}
                </Typography>
            </Box>
            <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                    borderRadius: 50, 
                    textTransform: 'none', 
                    fontSize: '16px',
                    padding: '10px 20px', 
                    backgroundColor: '#1DB954'
                }}
            >
                Log in with Spotify
            </Button>
        </Container>
    );
};

export default TopTracks;
