import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset'; import Grid from '@mui/material/Grid2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PythonOriginal, ReactOriginal } from 'devicons-react';

const Portfolio: React.FC = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <div>
            <Box className="Portfolio container">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        id="portfolio-horizontal-menu"
                        style={{
                            display: 'flex',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            flexGrow: 1
                        }}
                    >
                        {/* <IconButton
                            onClick={() => handleScroll('left')}
                            style={{ position: 'absolute', top: '50%', left: 0, zIndex: 1 }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton> */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {Array.from({ length: 20 }, (_, index) => (
                                <Button key={index} variant="outlined" style={{ margin: '4px' }}>
                                    Item {index + 1}
                                </Button>
                            ))}
                        </div>
                        {/* <IconButton
                            onClick={() => handleScroll('right')}
                            style={{ position: 'absolute', top: '50%', right: 0, zIndex: 1 }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton> */}
                    </div>
                    <IconButton
                        style={{
                            marginLeft: '16px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <FilterAltIcon />
                        <Typography variant="button" style={{ marginLeft: 8 }}>
                            Filter
                        </Typography>
                    </IconButton>
                </div>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(48, 28, 53, 0.9)',
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <a href="/projects/sortihue">
                                <Box
                                    component="picture"
                                    sx={{ display: 'block', position: 'relative' }}
                                >
                                    <img
                                        src="//images.ctfassets.net/rporu91m20dc/ALmln81sDf1daYt8Mlx6f/817ca6756291e7bc7b7360e7a06da8b3/Starfield_MobileCard_ShatteredSpaceTrailer.png"
                                        alt="Starfield Shattered Space"
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
                                    }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <WebAssetIcon />
                                        <Typography variant="subtitle2" ml={1}>
                                            Web Project
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6">
                                        <PythonOriginal /> <ReactOriginal />
                                    </Typography>
                                    <Typography variant="body2">Sortihue</Typography>
                                </Box>
                            </a>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
};

export default Portfolio;
