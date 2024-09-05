import React from 'react';
import './NavBar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <i className="icon-code"></i> <span className="logo-text">Name LastName</span>
      </a>
      <div className="navbar-links">
        <a href="/skills" className="navbar-item">Skills</a>
        <a href="/projects" className="navbar-item">Projects</a>
        <a href="/experience" className="navbar-item">Experience</a>
        <a href="/education" className="navbar-item">Education</a>
        <a href="/resume" className="navbar-item">Resumé</a>
      </div>
      <div className="navbar-actions">
        <a href="/search" className="action-item"><i className="icon-search"></i></a>
        <button className="action-item"><i className="icon-sun"></i></button>
      </div>
    </nav>
  );
};

export default Navbar;
