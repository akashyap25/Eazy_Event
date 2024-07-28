import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.grey[800]}`,
}));

const SocialMediaIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main || '#FFA500', // Default to orange if theme.palette.primary.main is not defined
  '&:hover': {
    color: theme.palette.primary.dark || '#FF8C00', // Default to a darker orange if theme.palette.primary.dark is not defined
    transform: 'scale(1.1)',
    transition: 'transform 0.3s, color 0.3s',
  },
  margin: theme.spacing(1),
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterContainer>
      <Typography variant="h6" component="div" gutterBottom>
        Follow Us
      </Typography>
      <Box>
        <SocialMediaIcon
          component="a"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </SocialMediaIcon>
        <SocialMediaIcon
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </SocialMediaIcon>
        <SocialMediaIcon
          component="a"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </SocialMediaIcon>
      </Box>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
