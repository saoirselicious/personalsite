import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <CodeIcon /> <span className="logo-text">Saoirse Seeber</span>
      </Link>
      
      <div className={`navbar-links highlightTextIn ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/skills" className="navbar-item"><EngineeringOutlinedIcon className='icon'/> Skills</Link>
        <Link to="/projects" className="navbar-item"><ChecklistOutlinedIcon className='icon'/> Projects</Link>
        <Link to="/experience" className="navbar-item"><ViewTimelineOutlinedIcon className='icon'/> Experience</Link>
        <Link to="/education" className="navbar-item"><SchoolOutlinedIcon className='icon'/> Education</Link>
        <Link to="/resume" className="navbar-item"><DescriptionOutlinedIcon className='icon'/> Resumé</Link>
      </div>

      <div className="navbar-actions">
        <button className="action-item" onClick={toggleTheme}><LightModeOutlinedIcon /></button>
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
