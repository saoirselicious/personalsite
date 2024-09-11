import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSpotifyTokenFromCode } from './SpotifyAuth';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SpotifyCallback: React.FC<{ onTokenFetched: (token: string) => void }> = ({ onTokenFetched }) => {
    const [error, setError] = useState<string | null>(null);
    const query = useQuery();
    const navigate = useNavigate();

    useEffect(() => {
        const code = query.get('code');

        if (!code) {
            setError('Authorization code not found');
            return;
        }

        const fetchToken = async () => {
            try {
                const data = await getSpotifyTokenFromCode(code);
                if (data.access_token) {
                    localStorage.setItem('spotifyToken', data.access_token); // Ensure this line executes
                    onTokenFetched(data.access_token);
                    navigate('/projects/sortihue/result'); // Redirect after setting token
                } else {
                    setError('No access token received');
                }
            } catch (err) {
                setError('Failed to fetch Spotify token');
                console.error(err);
            }
        };
        

        fetchToken();
    }, [query, navigate, onTokenFetched]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>Loading...</div>;
};

export default SpotifyCallback;
