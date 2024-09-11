import React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface NavbarProps {
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <CodeIcon /> <span className="logo-text">Saoirse Seeber</span>
      </a>
      <div className="navbar-links highlightTextIn">
        <a href="/skills" className="navbar-item"><EngineeringOutlinedIcon className='icon'/> Skills</a>
        <a href="/projects" className="navbar-item"><ChecklistOutlinedIcon className='icon'/> Projects</a>
        <a href="/experience" className="navbar-item"><ViewTimelineOutlinedIcon className='icon'/> Experience</a>
        <a href="/education" className="navbar-item"><SchoolOutlinedIcon className='icon'/> Education</a>
        <a href="/resume" className="navbar-item"><DescriptionOutlinedIcon className='icon'/> Resumé</a>
      </div>
      <div className="navbar-actions">
        {/* <a href="/search" className="action-item"><SearchOutlinedIcon /></a> */}
        <button className="action-item" onClick={toggleTheme}><LightModeOutlinedIcon /></button>
      </div>
    </nav>
  );
};

export default Navbar;
