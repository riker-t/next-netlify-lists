import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/FileCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

const ItemListActionBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (buttonName) => {
    console.log(`Button ${buttonName} clicked.`);
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 60, // Increase padding from bottom
      right: 2,
      '& > :not(style)': { m: 1 },
      display: 'flex',
      flexDirection: 'column-reverse', // Stack buttons vertically
      alignItems: 'center', // Center buttons
    }}>
        <Fab color="default" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertIcon />
      </Fab>
      {isOpen && (
        <>
          <Fab color="default" onClick={() => handleButtonClick('Copy')}>
            <ContentCopyIcon />
          </Fab>
          <Fab color="default" onClick={() => handleButtonClick('Like')}>
            <FavoriteIcon />
          </Fab>
          <Fab color="default" onClick={() => handleButtonClick('Share')}>
            <BookmarkOutlinedIcon />
          </Fab>
        </>
      )}
      {/* <Fab color="default" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertIcon />
      </Fab> */}
    </Box>
  );
};

export default ItemListActionBar;