import React, { useState } from 'react';
import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import EmailCompose from '../components/Email/EmailCompose';
import Inbox from '../components/Email/Inbox';
import EmailContent from '../components/Email/EmailContent';
import EmailNavMenu from '../components/Email/EmailNavMenu';

const Email = () => {
  const [selectedTab, setSelectedTab] = useState('inbox'); // Keep track of selected tab
  const [selectedEmail, setSelectedEmail] = useState(null); // Keep track of selected email



  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
    setSelectedEmail(null); // Reset selected email when changing tabs
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setSelectedTab('emailContent'); // Change the tab to display email content
  };

  const fakeDeletedEmails = [
    {
      id: 1,
      subject: 'Regarding Job Application',
      sender: 'hiringmanager@company.com',
      date: '2023-09-15',
      content: `
        Dear [Your Name],
  
        Thank you for your recent job application. We have received your application for the Software Engineer position at our company. Your qualifications and experience are impressive, and we would like to invite you for an interview.
  
        Interview Date: [Insert Interview Date]
        Interview Time: [Insert Interview Time]
        Location: [Insert Interview Location]
  
        Please confirm your availability for the interview by responding to this email. We look forward to meeting you and discussing your potential role within our organization.
  
        Best regards,
        [Hiring Manager Name]
        [Company Name]
      `,
    },
    {
      id: 2,
      subject: 'Meeting Request',
      sender: 'sarah.smith@example.com',
      date: '2023-09-16',
      content: `
        Hi [Recipient's Name],
  
        I hope you're doing well. I would like to request a meeting to discuss the upcoming project. I believe a face-to-face meeting would be beneficial for us to align our goals and expectations.
  
        Proposed Meeting Date: [Insert Date]
        Proposed Meeting Time: [Insert Time]
        Location: [Insert Location]
  
        Please let me know your availability or suggest an alternative time if the proposed date does not work for you. I look forward to our discussion.
  
        Best regards,
        Sarah Smith
      `,
    },
    {
      id: 3,
      subject: 'Product Feedback',
      sender: 'feedback@example.com',
      date: '2023-09-17',
      content: `
        Dear [Recipient's Name],
  
        We hope you're enjoying your recent purchase of [Product Name]. Your feedback is important to us, and we would appreciate it if you could take a moment to share your thoughts and experiences with the product.
  
        Your feedback will help us improve our products and services. Please click the link below to provide your feedback:
  
        [Feedback Survey Link]
  
        Thank you for choosing [Company Name]. We look forward to hearing from you.
  
        Regards,
        [Your Name]
        [Company Name]
      `,
    },
    {
      id: 4,
      subject: 'Invitation to Webinar',
      sender: 'webinar@example.com',
      date: '2023-09-18',
      content: `
        Hi [Recipient's Name],
  
        We are excited to invite you to our upcoming webinar titled "Digital Marketing Strategies for Success." This webinar will provide valuable insights into the latest trends in digital marketing and how they can benefit your business.
  
        Date: [Insert Webinar Date]
        Time: [Insert Webinar Time]
        Webinar Link: [Insert Webinar Link]
  
        Please RSVP by [RSVP Deadline Date] to secure your spot. We look forward to your participation in this informative session.
  
        Best regards,
        [Webinar Host Name]
        [Company Name]
      `,
    },
    {
      id: 5,
      subject: 'Important Update: Account Security',
      sender: 'security@example.com',
      date: '2023-09-19',
      content: `
        Dear [Recipient's Name],
  
        Your account security is our top priority. We recently detected unusual activity on your account, and as a precautionary measure, we have temporarily locked your account to protect your information.
  
        To unlock your account, please follow these steps:
        1. Click on the following link: [Account Unlock Link]
        2. Follow the on-screen instructions to reset your password.
        3. Once your password is reset, you will regain access to your account.
  
        If you did not initiate this action or suspect unauthorized access, please contact our support team immediately at [Support Email Address] or [Support Phone Number].
  
        We apologize for any inconvenience this may cause and appreciate your understanding.
  
        Sincerely,
        [Security Team]
        [Company Name]
      `,
    },
  ];
  const fakeEmails = [
    {
      id: 1,
      subject: 'Regarding Job Application',
      sender: 'hiringmanager@company.com',
      date: '2023-09-15',
      content: `
        Dear [Your Name],
  
        Thank you for your recent job application. We have received your application for the Software Engineer position at our company. Your qualifications and experience are impressive, and we would like to invite you for an interview.
  
        Interview Date: [Insert Interview Date]
        Interview Time: [Insert Interview Time]
        Location: [Insert Interview Location]
  
        Please confirm your availability for the interview by responding to this email. We look forward to meeting you and discussing your potential role within our organization.
  
        Best regards,
        [Hiring Manager Name]
        [Company Name]
      `,
    },
    {
      id: 2,
      subject: 'Meeting Request',
      sender: 'sarah.smith@example.com',
      date: '2023-09-16',
      content: `
        Hi [Recipient's Name],
  
        I hope you're doing well. I would like to request a meeting to discuss the upcoming project. I believe a face-to-face meeting would be beneficial for us to align our goals and expectations.
  
        Proposed Meeting Date: [Insert Date]
        Proposed Meeting Time: [Insert Time]
        Location: [Insert Location]
  
        Please let me know your availability or suggest an alternative time if the proposed date does not work for you. I look forward to our discussion.
  
        Best regards,
        Sarah Smith
      `,
    },
    {
      id: 3,
      subject: 'Product Feedback',
      sender: 'feedback@example.com',
      date: '2023-09-17',
      content: `
        Dear [Recipient's Name],
  
        We hope you're enjoying your recent purchase of [Product Name]. Your feedback is important to us, and we would appreciate it if you could take a moment to share your thoughts and experiences with the product.
  
        Your feedback will help us improve our products and services. Please click the link below to provide your feedback:
  
        [Feedback Survey Link]
  
        Thank you for choosing [Company Name]. We look forward to hearing from you.
  
        Regards,
        [Your Name]
        [Company Name]
      `,
    },
    {
      id: 4,
      subject: 'Invitation to Webinar',
      sender: 'webinar@example.com',
      date: '2023-09-18',
      content: `
        Hi [Recipient's Name],
  
        We are excited to invite you to our upcoming webinar titled "Digital Marketing Strategies for Success." This webinar will provide valuable insights into the latest trends in digital marketing and how they can benefit your business.
  
        Date: [Insert Webinar Date]
        Time: [Insert Webinar Time]
        Webinar Link: [Insert Webinar Link]
  
        Please RSVP by [RSVP Deadline Date] to secure your spot. We look forward to your participation in this informative session.
  
        Best regards,
        [Webinar Host Name]
        [Company Name]
      `,
    },
    {
      id: 5,
      subject: 'Important Update: Account Security',
      sender: 'security@example.com',
      date: '2023-09-19',
      content: `
        Dear [Recipient's Name],
  
        Your account security is our top priority. We recently detected unusual activity on your account, and as a precautionary measure, we have temporarily locked your account to protect your information.
  
        To unlock your account, please follow these steps:
        1. Click on the following link: [Account Unlock Link]
        2. Follow the on-screen instructions to reset your password.
        3. Once your password is reset, you will regain access to your account.
  
        If you did not initiate this action or suspect unauthorized access, please contact our support team immediately at [Support Email Address] or [Support Phone Number].
  
        We apologize for any inconvenience this may cause and appreciate your understanding.
  
        Sincerely,
        [Security Team]
        [Company Name]
      `,
    },
  ];

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={6} sx={{ padding: '16px', mt: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Your Email
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            {/* Navigation Menu */}
            <EmailNavMenu
              onTabChange={handleTabChange}
              selectedTab={selectedTab}
            />
          </Grid>
          <Grid item xs={9}>
            {/* Content Area */}
            <Paper elevation={3} sx={{ padding: '16px', height: '500px' }}>
              {selectedTab === 'compose' ? (
                <EmailCompose />
              ) : (
                <div>
                  {selectedEmail ? (
                    <EmailContent email={selectedEmail} />
                  ) : (
                    <Inbox
                      emails={
                        selectedTab === 'inbox'
                          ? fakeEmails
                          : selectedTab === 'trash'
                          ? fakeDeletedEmails
                          : [] // Default to an empty array if the selectedTab doesn't match
                      }
                      onEmailClick={handleEmailClick}
                      maxHeight="400px" // Set the max height for the email list
                    />
                  )}
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Email;
