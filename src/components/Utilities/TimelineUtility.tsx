import axios from 'axios';

export async function fetchTimelineContent() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/db/timeline');
        return (response.data);
    } catch (err) {
        return ('Failed to load db/timeline data');
    }
};
