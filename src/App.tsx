import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Skills from "./components/Homepage/Skills";
import Experience from "./components/Homepage/Timeline";
import Portfolio from './components/Homepage/Portfolio';
import Contact from './components/Homepage/Contact';
import CV from './components/CV/CV';
import Education from './components/Homepage/Education';
import TopTracks from './components/Sortihue/TopTracks';
import TopTracksList from './components/Sortihue/TopTracksList';
import Palette from './components/Sortihue/Palette';
import SpotifyCallback from './components/Utilities/SpotifyCallback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [refreshToken] = useState<string | null>(() => localStorage.getItem('refreshToken') || null);
  const [currentTheme, setCurrentTheme] = useState<string | null | undefined>();

  const { loading } = useLoading();
  const { error } = useError();



  const toggleTheme = () => {
    const currentThemeFromDOM = document.documentElement.getAttribute('data-theme');
    const newTheme = currentThemeFromDOM === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    toggleTheme();
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
    <Navbar toggleTheme={toggleTheme} />
    return <ErrorSplash />;
  }

  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} />
      <LoadingSplash />
      <div className={loading ? "hidden" : ""}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/resume" element={<CV />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/education" element={<Education dataTheme={currentTheme} />} />
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
          <Route path="/projects/sortihue/result/:val" element={<Palette />} />
          <Route path="/projects/sortihue/callback" element={<SpotifyCallback onTokenFetched={(token) => { setToken(token); localStorage.setItem('spotifyToken', token); }} />} />
          <Route path="*" element={<NotFoundSplash />} />
        </Routes>
      </div>
    </Router>
  );
}
