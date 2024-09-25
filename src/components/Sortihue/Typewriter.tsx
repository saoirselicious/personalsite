import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

interface TypewriterProps {
    text: string;
    speed?: number;
}

const useTypewriter = (text: string, speed: number = 50) => {
    const [displayText, setDisplayText] = useState<string>('');

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prevText => prevText + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, speed]);

    return displayText;
};

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50 }) => {
    const displayText = useTypewriter(text, speed);

    return <Typography
        variant="h4"
        style={{
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap', 
            overflowWrap: 'break-word', 
            wordWrap: 'break-word', 
            maxWidth: '100%', 
        }}
    >
        {displayText}
    </Typography>
};

export default Typewriter;