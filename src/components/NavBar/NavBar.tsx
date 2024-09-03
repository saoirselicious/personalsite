import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent

export default function SimpleAppBar() {
    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value) {
            navigate(value);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Saoirse Seeber
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ color: 'white', borderColor: 'white', minWidth: 120 }}
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value="/sortihue">Sortihue</MenuItem>
                        <MenuItem value="/">CV</MenuItem>
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
