import React, { useState } from 'react';
import { Container, Box, IconButton, Typography, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import Grid from '@mui/material/Grid2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { PythonOriginal, ReactOriginal } from 'devicons-react';
import Sortihue from '../../images/projects/sortihueSample.jpg';
import { Link } from 'react-router-dom';

const Portfolio: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedOptions(event.target.value as string[]);
    };
    return (
        <Container maxWidth="xl" sx={{ padding: '2rem' }}>
            <Box className="Portfolio" sx={{ position: 'relative' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                    <IconButton>
                        <Select
                            multiple
                            inputProps={{
                                MenuProps: {
                                    MenuListProps: {
                                        sx: {
                                            backgroundColor: 'var(--highlight-background-color)',
                                            color: 'var(--text-color)',
                                        }
                                    }
                                }
                            }}

                            value={selectedOptions}
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Typography variant="button">
                                    {selected.length ? selected.join(', ') : 'Filter'}
                                </Typography>
                            )}
                            sx={{ minWidth: 200, backgroundColor: 'var(--highlight-background-color)', color: 'var(--text-color)', border: '2px solid var(--accent-color)' }}
                            IconComponent={() => (
                                <IconButton>
                                    <FilterAltIcon />
                                </IconButton>
                            )}
                        >
                            <MenuItem value="Web Projects">
                                <Checkbox checked={selectedOptions.includes('Web Projects')} />
                                <ListItemText primary="Web Projects" />
                            </MenuItem>
                        </Select>
                    </IconButton>
                </Box>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box
                            sx={{
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <Link to="/projects/sortihue">
                                <Box
                                    component="picture"
                                    sx={{ display: 'block', position: 'relative' }}
                                >
                                    <img
                                        src={Sortihue}
                                        alt="Sortihue template"
                                        style={{
                                            width: '100%',
                                            filter: 'blur(0px)',
                                            transition: 'filter 500ms linear',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        backgroundImage:
                                            'linear-gradient(transparent 0%, rgba(48, 28, 53, 0.5) 25%, rgba(48, 28, 53, 0.75) 60%, rgb(48, 28, 53) 90%)',
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        color: '#fff',
                                        padding: '8px',
                                        paddingLeft: '40px'
                                    }}
                                >
                                    <Box display="flex" alignItems="left" >
                                        <Typography variant="h4" ml={0}>Sortihue
                                        </Typography>
                                    </Box>

                                    <Typography variant="h6">
                                        <WebAssetIcon />
                                        Web Project
                                    </Typography>
                                    <Typography variant="body2">
                                        <PythonOriginal size='2em' /> <ReactOriginal size='2em' />
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Portfolio;
