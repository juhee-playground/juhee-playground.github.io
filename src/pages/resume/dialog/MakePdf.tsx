import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Nav from 'layout/nav/Nav';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function PdfDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth='md' onClose={handleClose} open={open}>
      <DialogTitle>PDF TEST</DialogTitle>
      <Nav />
    </Dialog>
  );
}

export default PdfDialog;
