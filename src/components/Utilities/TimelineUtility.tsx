import axios from 'axios';

export async function fetchTimelineContent() {
    try {
        const response = await axios.get('https://profitable-sheri-seebers-8755823d.koyeb.app/api/db/timeline');
        return (response.data);
    } catch (err) {
        return ('Failed to load db/timeline data');
    }
};
