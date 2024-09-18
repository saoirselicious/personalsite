import React, { useState, useRef, useEffect } from 'react';
import { Container, TextField, Button, FormControl, Typography, Box } from '@mui/material';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
import { fetchRecaptchaConfig, fetchEmailJSConfig } from '../Utilities/ContactUtility';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [recaptchaConfig, setRecaptchaConfig] = useState<{ site_key: string; secret: string } | null>(null);
  const [emailJSConfig, setEmailJSConfig] = useState<{ service_id: string; public_key: string; private_key: string; template_id: string; } | null>(null);

  const handleCaptchaVerify = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  useEffect(() => {
    fetchRecaptchaConfig().then((result) => {
      setRecaptchaConfig(result)
    });
    fetchEmailJSConfig().then((result) => {
      setEmailJSConfig(result)
    });
  }, [])

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert('Please verify the reCAPTCHA.');
      return;
    }

    if (form.current) {
      emailjs.sendForm(
        emailJSConfig?.service_id as string,
        emailJSConfig?.template_id as string,
        e.target as HTMLFormElement,
        emailJSConfig?.public_key
      )
        .then((result) => {
          console.log('Email sent: ', result.text);
          alert('Email sent successfully!');
          setName('');
          setEmail('');
          setMessage('');
        })
        .catch((error) => {
          console.log('Email send error: ', error.text);
          alert('Failed to send the email.');
        });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', padding: '2rem 0' }}>

      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feel free to shoot me an email :{')'}
        </Typography>
        <form ref={form} onSubmit={sendEmail}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Name"
              name="from"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Message"
              multiline
              rows={4}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {recaptchaConfig ? (
              <ReCAPTCHA sitekey={recaptchaConfig.site_key} onChange={handleCaptchaVerify} />
            ) : (
              <Typography>Loading reCAPTCHA...</Typography>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={!captchaVerified}
          >
            Send
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
