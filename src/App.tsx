import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Skills from "./components/Homepage/Skills";
import Experience from "./components/Homepage/Timeline";
import Portfolio from './components/Homepage/Portfolio';
import CV from './components/CV/CV';
import TopTracks from './components/Utilities/TopTracks';
import TopTracksList from './components/Utilities/TopTracksList';
import SpotifyCallback from './components/Utilities/SpotifyCallback';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider, LoadingSplash, useLoading, ErrorProvider, ErrorSplash, useError, NotFoundSplash } from './components/Splashscreen/SplashScreen';

export default function App() {
  return (
    <LoadingProvider>
      <ErrorProvider>
        <AppContent />
      </ErrorProvider>
    </LoadingProvider>
  );
}

function AppContent() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotifyToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem('refreshToken') || null);

  const { loading } = useLoading();
  const { error } = useError();

  const toggleTheme = () => {
    console.log("toggleTheme");
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

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, [refreshToken]);

  if (error) {
    return <ErrorSplash />;
  }

  if (loading) {
    return <LoadingSplash />;
  }

  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/resume" element={<CV />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/projects/sortihue" element={<TopTracks />} />
        <Route
          path="/projects/sortihue/result"
          element={
            <TopTracksList
              token={token || localStorage.getItem('token') || ''}
              refreshToken={refreshToken || localStorage.getItem('refreshToken') || ''}
            />
          }
        />
        <Route path="/projects/sortihue/callback" element={<SpotifyCallback onTokenFetched={(token) => { setToken(token); localStorage.setItem('spotifyToken', token); }} />} />
        <Route path="*" element={<NotFoundSplash />} />
      </Routes>
    </Router>
  );
}
