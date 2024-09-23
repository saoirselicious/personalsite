import React, { useState } from 'react';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <CodeIcon /> <span className="logo-text">Saoirse Seeber</span>
      </Link>
      
      <div className={`navbar-links highlightTextIn ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/skills" className="navbar-item" onClick={closeMenu}>
          <EngineeringOutlinedIcon className="icon" /> Skills
        </Link>
        <Link to="/projects" className="navbar-item" onClick={closeMenu}>
          <ChecklistOutlinedIcon className="icon" /> Projects
        </Link>
        <Link to="/experience" className="navbar-item" onClick={closeMenu}>
          <ViewTimelineOutlinedIcon className="icon" /> Experience
        </Link>
        <Link to="/education" className="navbar-item" onClick={closeMenu}>
          <SchoolOutlinedIcon className="icon" /> Education
        </Link>
        <Link to="/resume" className="navbar-item" onClick={closeMenu}>
          <DescriptionOutlinedIcon className="icon" /> Resumé
        </Link>
        <Link to="/contact" className="navbar-item" onClick={closeMenu}>
          <ContactPageOutlinedIcon className="icon" /> Contact
        </Link>
      </div>

      <div className="navbar-actions">
        <Button className="navbar-item" onClick={toggleTheme}>
          <LightModeOutlinedIcon className="icon" style={{color: 'var(--text-color)'}} />
        </Button>
        <Button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseIcon style={{color: 'var(--text-color)'}}/> : <MenuIcon style={{color: 'var(--text-color)'}}/>}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
