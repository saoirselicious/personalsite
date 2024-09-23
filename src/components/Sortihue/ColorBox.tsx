import React from 'react';

interface ColorBoxProps {
    rgb: [number, number, number];
}

const ColorBox: React.FC<ColorBoxProps> = ({ rgb }) => {
    // Create the RGB string
    const rgbString = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    return (
        <div
            style={{
                width: '100px',  
                height: '100px',
                backgroundColor: rgbString,
                border: '1px solid #000', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
            }}
        >
        </div>
    );
};

export default ColorBox;
