import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSpotifyTokenFromCode } from './SpotifyAuth.tsx';

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
                localStorage.setItem('spotifyToken', data.access_token); // Store token in localStorage
                onTokenFetched(data.access_token);
                navigate('/sortihue/result'); // Redirect after setting token
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
