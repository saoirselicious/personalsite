import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, FormControl, Typography, Box, InputLabel, Input } from '@mui/material';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
import { fetchRecaptchaConfig, fetchEmailJSConfig } from '../ContactUtility';

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
          alert('Email sent successfully!');
          setName('');
          setEmail('');
          setMessage('');
        })
        .catch((error) => {
          alert('Failed to send the email.');
        });
    }
  };

  return (
    <Container maxWidth="xl" sx={{
      textAlign: 'center', display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', minHeight: '50rem', padding: '2rem'
    }}>

      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feel free to shoot me an email :{')'}
        </Typography>
        <form ref={form} onSubmit={sendEmail}>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{
              color: 'var(--text-color)',
              paddingTop: '15px'
            }}>Name</InputLabel>
            <Input
              type='name'
              name="from"
              value={name}
              sx={{
                color: 'var(--text-color)',
                backgroundColor: 'var(--highlight-background-color)',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                '&:hover': {
                  borderColor: 'var(--primary-color)',
                },
                '&.Mui-focused': {
                  borderColor: 'var(--primary-color)',
                },
                '&.Mui-error': {
                  borderColor: 'var(--error-color)',
                },
              }}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{
              color: 'var(--text-color)',
              paddingTop: '15px'
            }}>Email</InputLabel>
            <Input
              type="email"
              name="email"
              value={email}
              sx={{
                color: 'var(--text-color)',
                backgroundColor: 'var(--highlight-background-color)',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                '&:hover': {
                  borderColor: 'var(--primary-color)',
                },
                '&.Mui-focused': {
                  borderColor: 'var(--primary-color)',
                },
                '&.Mui-error': {
                  borderColor: 'var(--error-color)',
                },
              }}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl variant='outlined' fullWidth margin="normal">
            <InputLabel style={{
              color: 'var(--text-color)',
              paddingTop: '15px',
              border: 'red'
            }}>Message</InputLabel>
            <Input
              multiline
              rows={4}
              name="message"
              value={message}
              sx={{
                color: 'var(--text-color)',
                backgroundColor: 'var(--highlight-background-color)',
                padding: '12px',
                borderRadius: '8px',
              }}
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
            sx={{ bgcolor: 'var(--primary-color)' }}
          >
            Send
          </Button>
        </form>
      </Box>
    </Container >
  );
};

export default Contact;
