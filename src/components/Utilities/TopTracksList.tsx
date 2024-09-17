import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useLoading } from '../Splashscreen/SplashScreen';

interface Track {
    name: string;
    artists: { name: string }[];
    album: {
        images: { url: string }[];
    };
}

interface Props {
    token: string;
    refreshToken: string; // Add refreshToken as prop
}

const fetchWebApi = async (endpoint: string, token: string) => {
    const url = `https://profitable-sheri-seebers-8755823d.koyeb.app${endpoint}`;
    console.log(endpoint);
    console.log(token);
    console.log(`Request URL: ${url}`);
    console.log(`Authorization Header: Bearer ${token}`);

    try {
        const res = await axios({
            url: url,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        console.error('Error fetching data:', error.response?.statusText || error.message);
        throw new Error(`Error fetching data: ${error.response?.statusText || error.message}`);
    }
};

const getTopTracks = async (token: string, refreshToken: string): Promise<Track[]> => {
    try {
        const data = await fetchWebApi('/api/spotify/top-tracks', token);
        return data.items || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401 && refreshToken) {
                console.log('Token expired, refreshing...');
                const newToken = await refreshSpotifyToken(refreshToken);
                if (newToken) {
                    const data = await fetchWebApi('/api/spotify/top-tracks', newToken);
                    return data.items || [];
                } else {
                    console.error('Failed to refresh token.');
                    throw new Error('Failed to refresh token');
                }
            }
        }
        console.error('Failed to fetch top tracks:', error);
        throw error;
    }
};

const refreshSpotifyToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await fetch('/api/spotify/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await response.json();

        if (response.ok && data.access_token) {
            return data.access_token;
        } else {
            console.error('Error refreshing token:', data);
            return null;
        }
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return null;
    }
};

const TopTracksList: React.FC<Props> = ({ token, refreshToken }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        if (!token) {
            console.error('No token provided!');
            return;
        }

        //setLoading(true); // Start loading

        const fetchTracks = async () => {
            try {
                const topTracks = await getTopTracks(token, refreshToken); // Pass refreshToken
                setTracks(topTracks);
            } catch (err) {
                console.error('Error fetching top tracks:', err);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchTracks();
    }, [token, refreshToken, setLoading]);

    if (!token) {
        return <div>Please log in to view your top tracks.</div>;
    }

    return (
        <Box component="section">
            <Grid container spacing={{ xs: 2, md: 8 }}>
                {tracks.map((track, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src={track.album.images[0]?.url}
                                alt={track.name}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <div>
                                <span>
                                    {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                                </span>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TopTracksList;
