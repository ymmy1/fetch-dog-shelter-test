import React from 'react';
import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Tooltip, IconButton } from '@mui/material';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #f2f2f2;
  border-top: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
  gap: 8px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <span>Fetch Dog Shelter Test by</span>
      <FooterLink
        href='https://github.com/ymmy1/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Tooltip title='GitHub Profile'>
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        ymmy1
      </FooterLink>
      <FooterLink
        href='https://ymmy1.github.io/static/media/OLEG%20NOSYREV%20Resume.154de14ac89f85508769.pdf'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Tooltip title='Resume'>
          <IconButton>
            <InsertDriveFileIcon />
          </IconButton>
        </Tooltip>
      </FooterLink>
    </FooterContainer>
  );
};

export default Footer;
