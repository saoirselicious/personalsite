import axios from 'axios';

const fetchSpotifyConfig = async () => {
  try {
    const response = await axios.get('https://profitable-sheri-seebers-8755823d.koyeb.app/api/spotify/config');
    return response.data;
  } catch (error) {
    console.error('Error fetching Spotify config:', error);
    throw error; 
  }
};

// Redirect user to Spotify for authentication
export const redirectToSpotifyAuth = async () => {
  try {
    const { clientId, redirectUri } = await fetchSpotifyConfig();
    const scopes = 'user-top-read'; // Add necessary scopes here
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  } catch (error) {
    console.error('Error redirecting to Spotify:', error);
  }
};

// Get Spotify token from authorization code
export const getSpotifyTokenFromCode = async (code: string) => {
  const url = 'https://profitable-sheri-seebers-8755823d.koyeb.app/api/spotify/auth'; // Update with your backend URL
  try {
    const response = await axios.post(url, { code });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching token:', error.response?.data || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
};

export const getClientCredentialsToken = async () => {
  try {
    const { clientId, clientSecret } = await fetchSpotifyConfig(); // Fetch config to get client credentials
    const url = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(url, data.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching token:', error.response?.data || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
};
