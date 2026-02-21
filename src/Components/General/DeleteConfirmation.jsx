import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button as MuiButton, CircularProgress } from '@mui/material';
import { Trash2 } from 'lucide-react';
import Button from '../UI/Button';
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
      <Button
        size="sm"
        variant="outline"
        className="bg-white/90 backdrop-blur-sm border-white hover:bg-white z-10"
        onClick={handleClickOpen}
        icon={Trash2}
      >
        Delete
      </Button>

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
          <MuiButton onClick={handleClose} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleDelete} color="secondary" autoFocus>
            {isPending ? <CircularProgress size={24} /> : 'Delete'}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteConfirmation.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default DeleteConfirmation;
