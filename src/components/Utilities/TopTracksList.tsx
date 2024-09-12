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
}

const fetchWebApi = async (endpoint: string, token: string) => {
    const url = `http://profitable-sheri-seebers-8755823d.koyeb.app/${endpoint}`;
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

const getTopTracks = async (token: string): Promise<Track[]> => {
    const data = await fetchWebApi('/api/spotify/top-tracks', token)
        
    return data.items || [];
};

const TopTracksList: React.FC<Props> = ({ token }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        //setLoading(true);
        const fetchTracks = async () => {
            try {
                const topTracks = await getTopTracks(token);
                setTracks(topTracks);
            } catch (err) {
                console.error('Error fetching top tracks:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, [token, setLoading]);

    useEffect(() => {
        if (tracks.length > 0) {
            const sendTracksData = async () => {
                try {
                    const response = await axios.post('http://profitable-sheri-seebers-8755823d.koyeb.app/receive-tracks', tracks, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    console.log('Tracks data sent successfully:', response.data);
                } catch (error) {
                    console.error('Error sending tracks data:', error);
                }
            };
            sendTracksData();
        }
    }, [tracks]);

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
