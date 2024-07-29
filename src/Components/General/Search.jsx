import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ placeholder = 'Search title...' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(location.search);

      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }

      navigate({ search: params.toString() }); 
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, location.search, navigate]); 

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      minHeight: '54px',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '9999px', 
      backgroundColor: '#f0f0f0', 
    }}>
      <TextField
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        size="small"
        
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            backgroundColor: '#f0f0f0',
            borderRadius: '9999px', // Full rounded corners
          }
        }}
        fullWidth
      />
    </div>
  );
};

export default Search;
