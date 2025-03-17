import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddDocumentButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    onClick={onClick}
    style={{
      borderRadius: 30,
      padding: '10px 20px',
      fontSize: '1rem',
      textTransform: 'none',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      margin: '10px',
    }}
  >
    Add Document
  </Button>
);

export default AddDocumentButton; 