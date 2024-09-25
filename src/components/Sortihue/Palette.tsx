import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLoading } from '../Splashscreen/SplashScreen';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ColorBox from './ColorBox';

interface ColorPalette {
    artist: string;
    frequency: number[];
    group: string[];
    palette: [number, number, number][];
    track: string;
}

const Palette: React.FC = () => {
    const location = useLocation();
    const { track } = location.state;
    const [data, setData] = useState<ColorPalette | null>(null);
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        const sendTrackData = async (track: any) => {
            setLoading(true);
            const url = 'https://profitable-sheri-seebers-8755823d.koyeb.app/receive-tracks';
            try {
                const response = await axios.post(url, [track], {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setData(response.data.data[0]);
                setLoading(false);
                return response.data;
            } catch (error) {
                console.error('Error sending track data:', error);
                setLoading(false);
                throw error;
            }
        };
        sendTrackData(track);
    }, [track, setLoading]);

    return (
        <Container>
            <Box sx={{ marginTop: 4 }}>
                {loading ? null : data == null ? (
                    <p>No experience data available</p>
                ) : (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h3" sx={{ marginBottom: 2 }}>{data.artist}</Typography>
                            <Typography variant="h4" sx={{ marginBottom: 2 }}>{track.album.name}</Typography>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>{data.track}</Typography>
                            <Box
                                component="img"
                                src={track.album.images[0]?.url}
                                alt="Sample Image"
                                sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box>
                                <TableContainer component={Paper} sx={{ backgroundColor: 'var(--background-color)', overflowX: 'auto' }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"></TableCell>
                                                <TableCell sx={{ color: 'var(--text-color)' }} align="center">Colour Group</TableCell>
                                                <TableCell sx={{ color: 'var(--text-color)' }} align="center">Palette</TableCell>
                                                <TableCell sx={{ color: 'var(--text-color)' }} align="center">Frequency</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.group.map((colorGroup, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }}>
                                                        <ColorBox rgb={data.palette[index]} />
                                                    </TableCell>
                                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }} align="center">{colorGroup}</TableCell>
                                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }} align="center">{`[${data.palette[index].join(', ')}]`}</TableCell>
                                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }} align="center">{data.frequency[index]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default Palette;
