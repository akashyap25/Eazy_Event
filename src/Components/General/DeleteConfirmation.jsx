import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, CircularProgress } from '@mui/material';
import deleteIcon from '../../assets/icons/delete.svg'
import deleteEvent from '../../Utils/DeleteEvent';

const DeleteConfirmation = ({ eventId }) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleClickOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await deleteEvent({ eventId });
      setIsPending(false);
      setOpen(false);
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error deleting event:', error);
      setIsPending(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="delete">
        <img
          src={deleteIcon}
          alt="Delete"
          style={{ width: 24, height: 24 }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently delete this event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            {isPending ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteConfirmation.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default DeleteConfirmation;
