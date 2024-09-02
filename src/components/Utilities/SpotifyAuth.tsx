// spotifyAuth.ts
import axios from 'axios';

const clientId = 'c1df2cffc2f1452fb87fdd78c6a5ba02';
const clientSecret = '6155685198ea4df9b486b8a5242451cb';
const redirectUri = 'http://localhost:3000/callback'; // Replace with your actual redirect URI

export const redirectToSpotifyAuth = () => {
    console.log("Spotify Auth: redirectToSpotifyAuth")
    const scopes = 'user-top-read'; // Add necessary scopes here
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
};

export const getSpotifyTokenFromCode = async (code: string) => {
    const url = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
    });

    try {
        const response = await axios.post(url, data.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        throw error;
    }
};

export const getClientCredentialsToken = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
    });

    try {
        const response = await axios.post(url, data.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        throw error;
    }
};
