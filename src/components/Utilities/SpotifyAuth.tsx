import axios from 'axios';

// Use the non-null assertion operator (!) if you are certain these values will be defined
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET!;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI!;

export const redirectToSpotifyAuth = () => {
    console.log("Spotify Auth: redirectToSpotifyAuth");
    const scopes = 'user-top-read'; // Add necessary scopes here
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
};

export const getSpotifyTokenFromCode = async (code: string) => {
    const url = 'http://profitable-sheri-seebers-8755823d.koyeb.app/api/spotify/auth'; // Update with your backend URL
    try {
        const response = await axios.post(url, { code });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Error is an AxiosError
            console.error('Error fetching token:', error.response?.data || error.message);
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
        throw error; // Re-throw the error if needed
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
        // Assert the error type
        if (axios.isAxiosError(error)) {
            // Access specific properties of the AxiosError object
            console.error('Error fetching token:', error.response?.data || error.message);
        } else {
            // Handle other error types if necessary
            console.error('An unexpected error occurred:', error);
        }
        throw error;
    }
};