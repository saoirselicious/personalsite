import React from 'react';
import { Container, Box, Typography, Divider } from '@mui/material';

const Education: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', padding: '2rem 0' }}>

      <Box sx={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Education
        </Typography>

        <Divider />

        <Box sx={{ marginTop: '1rem' }}>
          <Typography variant="h6">
            M.Sc Interactive Digital Media
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Trinity College Dublin, 2018 - 2019
          </Typography>
        </Box>

        <Divider sx={{ marginY: '1rem' }} />

        <Box>
          <Typography variant="h6">
            B.Mus
          </Typography>
          <Typography variant="body2" color="textSecondary">
            University College Dublin, 2013 - 2016
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Education;