// src/components/TopTracksList
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', token);
    return data.items;
};

const TopTracksList: React.FC<Props> = ({ token }) => {
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const topTracks = await getTopTracks(token);
                setTracks(topTracks);
                SendTracks(topTracks);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTracks();
    }, [token]);

    const SendTracks = (data: Track[]) => {
        const sendTracksData = async () => {

            try {
                const response = await axios.post('http://127.0.0.1:5000/receive-tracks', data, {
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
    }

    return (
        <ul>
            {tracks.map((track, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img
                        src={track.album.images[0]?.url}
                        alt={track.name}
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <span>
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TopTracksList;
