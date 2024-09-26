import React from 'react';

interface ColorBoxProps {
    rgb: [number, number, number];
}

const ColorBox: React.FC<ColorBoxProps> = ({ rgb }) => {
    const rgbString = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    return (
        <div
            style={{
                width: '22px',  
                height: '22px',
                border: '2px solid var(--accent-color)',
                filter: 'invert(1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: rgbString,
                }}
            />
        </div>
    );
};

export default ColorBox;
