import React, { useState } from 'react';
import { Box, Typography, InputBase, Card, CardContent, CardMedia, styled } from '@mui/material';
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
const Homepage: React.FC = () => {
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
      {Object.keys(filteredSkills).map((classification) => (
        <Box key={classification} mt={4}>
          <Typography variant="h4" gutterBottom>
            {classification}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            {filteredSkills[classification].map((skill) => (
              <Card key={skill.name} sx={{ width: 200 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={skill.image}
                  alt={skill.name}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {skill.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Homepage;
