import React, { useState } from 'react';
import { Box, Container, Typography, Card, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  AzuredevopsOriginal,
  BitbucketOriginal,
  CplusplusPlain,
  CsharpLine,
  Css3Plain,
  DotNetPlain,
  JavascriptOriginal,
  GitPlain,
  Html5Original,
  InsomniaPlain,
  MayaOriginal,
  PythonOriginal,
  ReactOriginal,
  UnrealengineOriginal,
  UnityPlain,
  VisualstudioPlain,
  VscodePlain,
  TypescriptOriginal,
} from 'devicons-react';

type Skill = {
  name: string;
  classification: string;
};

const skillsData: Skill[] = [
  { name: 'Javascript', classification: "Programming Languages" },
  { name: 'Typescript', classification: "Programming Languages" },
  { name: 'CSS', classification: "Markup" },
  { name: 'HTML', classification: "Markup" },
  { name: 'React', classification: "Libraries" },
  { name: 'Azure DevOps', classification: "DevOps" },
  { name: 'C++', classification: "Programming Languages" },
  { name: 'C#', classification: "Programming Languages" },
  { name: 'Git', classification: "Version Control" },
  { name: 'Bitbucket', classification: "Version Control" },
  { name: 'Insomnia', classification: "Tools" },
  { name: '.Net', classification: "Libraries" },
  { name: 'Maya', classification: "3D Modeling" },
  { name: 'Python', classification: "Programming Languages" },
  { name: 'Unreal Engine', classification: "Game Engines" },
  { name: 'Visual Studio', classification: "Tools" },
  { name: 'VS Code', classification: "Tools" },
  { name: 'Unity', classification: "Game Engines" }
];
const skillIcons: { [key: string]: JSX.Element } = {
  'Azure DevOps': <AzuredevopsOriginal size="5em" />,
  'Bitbucket': <BitbucketOriginal size="5em" />,
  'C++': <CplusplusPlain size="5em" />,
  'C#': <CsharpLine size="5em" />,
  'CSS': <Css3Plain size="5em" />,
  'Git': <GitPlain size="5em" />,
  'HTML': <Html5Original size="5em" />,
  'Insomnia': <InsomniaPlain size="5em" />,
  '.Net': <DotNetPlain size="5em" />,
  'Maya': <MayaOriginal size="5em" />,
  'Javascript': <JavascriptOriginal size="5em" />,
  'Python': <PythonOriginal size="5em" />,
  'React': <ReactOriginal size="5em" />,
  'Unreal Engine': <UnrealengineOriginal size="5em" />,
  'Visual Studio': <VisualstudioPlain size="5em" />,
  'VS Code': <VscodePlain size="5em" />,
  'Unity': <UnityPlain size="5em" />,
  'Typescript': <TypescriptOriginal size="5em" />,
};

const Skills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.classification]) {
      acc[skill.classification] = [];
    }
    acc[skill.classification].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

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
    <Container maxWidth="xl" sx={{ textAlign: 'center', padding: '2rem' }}>
      <Box p={3} component="section" textAlign="center">
        <Typography variant="h1" gutterBottom>
          Skills
        </Typography>
        <TextField
          id="skills-search"
          label="Search"
          variant="outlined"
          style={{ width: "75%", marginBottom: '20px', color: 'var(--text-color)', backgroundColor: 'var(--highlight-background-color)' }}
          sx={{ input: { color: 'var(--text-color)' } }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            inputLabel: {
              style: { color: 'var(--text-color)' },
            },
          }}
        />
        <Box>
          {Object.keys(filteredSkills).map((classification) => (
            <div key={classification}>
              <Typography variant="h4" style={{ margin: '40px' }}>
                {classification}
              </Typography>
              <Grid container spacing={3}>
                {filteredSkills[classification].map((skill) => (
                  <Grid size={4}>
                    <Card
                      key={skill.name}
                      sx={{
                        borderRadius: 3,
                        width: '95%',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 10px',
                        backgroundColor: 'var(--card-background-color)',
                        color: 'var(--text-color)',
                        gap: 1, 
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {skill.name}
                      </Typography>

                      {skillIcons[skill.name] || <Typography>No Icon</Typography>}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Box>
      </Box >
    </Container>
  );
};

export default Skills;
