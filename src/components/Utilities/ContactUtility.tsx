import axios from 'axios';

export async function fetchRecaptchaConfig() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/recaptcha/config');
        return (response.data);
    } catch (err) {
        return ('Failed to load reCAPTCHA configuration');
    }
};

export async function fetchEmailJSConfig() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/emailjs/config');
        return (response.data);
    } catch (err) {
        return ('Failed to load EmailJS configuration');
    }
};