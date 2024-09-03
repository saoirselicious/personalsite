import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Header from './components/NavBar/NavBar';
import TopTracks from './components/Utilities/TopTracks';
import TopTracksList from './components/Utilities/TopTracksList';
import SpotifyCallback from './components/Utilities/SpotifyCallback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider, LoadingSplash, useLoading, ErrorProvider, ErrorSplash, useError, NotFoundSplash } from './components/Splashscreen/SplashScreen';

export default function App() {
  return <LoadingProvider><ErrorProvider><AppContent /></ErrorProvider></LoadingProvider>
}

function AppContent() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotifyToken'));

  const { loading } = useLoading();
  const { error } = useError();

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const themeToggleButton = document.querySelector('#theme-toggle');
    if (themeToggleButton) {
      themeToggleButton.addEventListener('click', toggleTheme);
    }

    return () => {
      if (themeToggleButton) {
        themeToggleButton.removeEventListener('click', toggleTheme);
      }
    };
  }, []);

  if (error) {
    return <ErrorSplash />;
  }
  if (loading) {
    return <LoadingSplash />;
  }

  return (
    <Router>
      <Header />
      <button id="theme-toggle">Click Here</button>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sortihue" element={<TopTracks />} />
        <Route path="/callback" element={<SpotifyCallback onTokenFetched={(token) => { setToken(token); localStorage.setItem('spotifyToken', token); }} />} />
        <Route path="/sortihue/result" element={<TopTracksList token={token || ''} />} />
        <Route path="*" element={<NotFoundSplash />} />
      </Routes>
    </Router>
  );
}
