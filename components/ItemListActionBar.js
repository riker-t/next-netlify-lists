import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/FileCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const ItemListActionBar = () => {

  const [isOpen, setIsOpen] = useState(true);

  const handleButtonClick = (buttonName) => {
    console.log(`Button ${buttonName} clicked.`);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#5551FF',
        darker: '#053e85',
      },
      secondary: {
        main: '#FFFFFF',
        darker: '#053e85',
      }
    },
  });


  return (
    <Box sx={{
      position: 'fixed',
      bottom: 60, // Increase padding from bottom
      right: 10,
      '& > :not(style)': { m: 1 },
      display: 'flex',
      flexDirection: 'column-reverse', // Stack buttons vertically
      alignItems: 'center', // Center buttons
    }}>
      <ThemeProvider theme={theme}>
        {isOpen ? (
        <Fab color="primary" sx={{ border: 2, borderColor: 'black' }} onClick={() => setIsOpen(!isOpen)}>
          <ExpandMoreIcon />
        </Fab>
        ) :
        <Fab color="primary" sx={{ border: 2, borderColor: 'black' }} onClick={() => setIsOpen(!isOpen)}>
          <ExpandLessIcon />
        </Fab>}

        {isOpen && (
          <>
            <Fab color="secondary" sx={{ border: 2, borderColor: 'black' }} onClick={() => navigator.clipboard.writeText('https://main--glittery-monstera-cafd18.netlify.app/example_list')}>
              <ContentCopyIcon />
            </Fab>
            <Fab color="secondary" sx={{ border: 2, borderColor: 'black' }} onClick={() => handleButtonClick('Like')}>
              <FavoriteIcon />
            </Fab>
            <Fab color="secondary" sx={{ border: 2, borderColor: 'black' }} onClick={() => handleButtonClick('Share')}>
              <BookmarkOutlinedIcon />
            </Fab>
          </>
        )}
      </ThemeProvider>
      {/* <Fab color="default" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertIcon />
      </Fab> */}
    </Box>
  );
};

export default ItemListActionBar;
