// src/components/TopTracksList
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
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


    try {
        const res = await axios({
            url: `https://api.spotify.com/${endpoint}`,
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
    const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=50', token);
    return data.items;
};

const TopTracksList: React.FC<Props> = ({ token }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        const fetchTracks = async () => {
            try {
                const topTracks = await getTopTracks(token);
                setTracks(topTracks);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTracks();
    }, [token]);

    useEffect(() => {
        if (tracks.length > 0) {
            const sendTracksData = async () => {
                try {
                    const response = await axios.post('personalsite-backend.profitable-sheri.internal:8000/receive-tracks', tracks, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log(response.data); // Handle success response
                } catch (error) {
                    console.error('Error sending data:', error); // Handle error
                }
            };
            sendTracksData();
            setLoading(false);
        }
    }, [tracks]);

    return (
        <Box component="section">
            <Grid container spacing={{ xs: 2, md: 8 }}>
                {tracks.map((track, index) => (
                    <Grid key={index} size={4}>
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src={track.album.images[0]?.url}
                                alt={track.name}
                                style={{ width: '75%', height: '75%' }}
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
