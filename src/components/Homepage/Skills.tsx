import React, { useState } from 'react';
import { Box, Typography, InputBase, Card, CardContent, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import jsImage from '../../images/logos/js.png';
import tsImage from '../../images/logos/ts.png';
import cssImage from '../../images/logos/css.png';
import htmlImage from '../../images/logos/html.png';
import sassImage from '../../images/logos/sass.png';
import reactImage from '../../images/logos/react.png';

// Define Skill Type
type Skill = {
  name: string;
  image: string;
  classification: string;
};

// Sample skills data
const skillsData: Skill[] = [
  { name: 'JavaScript', image: jsImage, classification: "Programming Languages" },
  { name: 'TypeScript', image: tsImage, classification: "Programming Languages" },
  { name: 'CSS', image: cssImage, classification: "Markup" },
  { name: 'HTML', image: htmlImage, classification: "Markup" },
  { name: 'Sass', image: sassImage, classification: "Libraries" },
  { name: 'React Js', image: reactImage, classification: "Libraries" },
];

// Styled InputBase
const SearchInput = styled(InputBase)({
  borderRadius: '15px',
  backgroundColor: '#f0f0f0',
  padding: '0 10px',
  width: '100%',
  maxWidth: '300px',
  marginBottom: '20px',
  '& .MuiInputBase-input': {
    padding: '10px',
  },
});

// Main Page Component
const Skills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Group skills by classification
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.classification]) {
      acc[skill.classification] = [];
    }
    acc[skill.classification].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  // Filter skills based on search term
  const filteredSkills = Object.keys(groupedSkills).reduce((acc, classification) => {
    const filtered = groupedSkills[classification].filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[classification] = filtered;
    }
    return acc;
  }, {} as { [key: string]: Skill[] });

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h1" gutterBottom>
        Skills
      </Typography>
      <SearchInput
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startAdornment={<SearchIcon />}
      />
      <Box>
        {Object.keys(filteredSkills).map((classification) => (
          <div key={classification}>
            <Typography variant="h4" gutterBottom>
              {classification}
            </Typography>
            <Grid container spacing={3}>
              {filteredSkills[classification].map((skill) => (
                <Card
                  key={skill.name}
                  sx={{
                    width: 560,
                    height: 70,
                    borderRadius: 3,
                    backgroundImage: `
                    linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0.3) 100%),
                    url(${skill.image})`,
                    backgroundSize: '50%',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'flex-end', // Align the content at the bottom
                    color: 'black', // Text color on the image
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {skill.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
