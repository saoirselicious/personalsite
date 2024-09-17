import React from 'react';
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import profileImg from "../../images/profile.png"

const Homepage = () => {
  return (
      <Container maxWidth="xl" sx={{ textAlign: 'center', padding: '2rem 0' }}>
        {/* Picture Section */}
        <Box component="img"
          src={profileImg}
          alt="Profile Picture"
          sx={{ height: '150px', width: '150px', borderRadius: '50%', marginBottom: '1.5rem' }}
        />

        {/* Three Word Summary */}
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
          Innovative, Driven, Growth
        </Typography>

        {/* Paragraph Summary */}
        <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
          Experienced software engineer with nearly half a decade of professional experience in driving innovation. Proficient in quickly adapting to new technologies, driven to create the highest quality products, and always striving for constant growth.
        </Typography>

        {/* Icons Section */}
        <Box sx={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton href="https://www.linkedin.com/in/saoirse-seeber" target="_blank" >
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://github.com/saoirselicious" target="_blank" >
            <GitHubIcon />
          </IconButton>
        </Box>

        {/* CV Download */}
        <Button variant="contained" sx={{ backgroundColor: 'var(--primary-color)' }} href="/path/to/your/cv.pdf" download>
          Download CV
        </Button>
      </Container>
  );
};

export default Homepage;
