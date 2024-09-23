import React from 'react';
import { Container, Box, Typography, Divider } from '@mui/material';
import TCDImg from "../../images/education/TCDLogo.png"
import UCDImg from "../../images/education/UCDLogo.png"

interface EducationProps {
  dataTheme: string | null | undefined;
}

const Education: React.FC<EducationProps> = ({ dataTheme }) => {

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', padding: '2rem 0' }}>
      <Box>
        <Typography variant="h4">
          Education
        </Typography>

        <Divider sx={{ bgcolor: 'var(--primary-color)', marginTop: '0.5rem' }} />

        <Box sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <Box component="img"
            src={TCDImg}
            alt="Profile Picture"
            sx={{
              height: '150px', width: '425px', filter: dataTheme !== 'dark' ? 'invert(1)' : '',
            }}
          />
          <Typography variant="h6">
            M.Sc Interactive Digital Media
          </Typography>
          <Typography variant="body2" sx={{marginBottom: '2rem' }}>
            Trinity College Dublin, 2018 - 2019
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: 'var(--primary-color)' }} />

        <Box sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <Box component="img"
            src={UCDImg}
            alt="Profile Picture"
            sx={{ height: '150px', width: '221px', borderRadius: '50%'}}
          />
          <Typography variant="h6">
            B.Mus
          </Typography>
          <Typography variant="body2">
            University College Dublin, 2013 - 2016
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Education;