import { IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export function renderApplicantsList(job) {
  if (job.Applications && job.Applications.length > 0) {
    return (
      <List sx={{ overflow: 'auto' }}>
        {job.Applications.map((application) => (
          <ListItem
            key={application.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <ListItemText>{application.User.username}</ListItemText>
            <IconButton
              color="#7C7287"
              sx={{ '& :hover': { color: '#E76E53' } }}>
              <CheckCircleIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  } else {
    return <p>No applicants yet.</p>;
  }
}
