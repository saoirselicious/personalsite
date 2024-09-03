import React, { useEffect, useState } from 'react';
import { redirectToSpotifyAuth } from './SpotifyAuth'; // Removed the `` extension
import { useNavigate } from 'react-router-dom';

const TopTracks: React.FC = () => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('spotifyToken');
        if (storedToken) {
            setToken(storedToken);
            navigate('/sortihue/result'); // Redirect to result page if token exists
        }
    }, [navigate]);

    const handleLogin = () => {
        redirectToSpotifyAuth(); // Assumes this handles redirection
    };

    return (
        <div>
            <h1>My Top Spotify Tracks</h1>
            {!token ? (
                <button onClick={handleLogin}>Log in with Spotify</button>
            ) : (
                <p style={{ color: 'red' }}>Error</p> // Display error if needed
            )}
        </div>
    );
};

export default TopTracks;
