import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; 
import getAllCategories from '../../Utils/GetAllCategories';

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Updated to useNavigate
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const params = new URLSearchParams(location.search);

    if (category && category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    navigate({ search: params.toString() });
  };

  return (
    <div className='flex items-center w-full min-h-14 rounded-s-full '>
    <FormControl fullWidth sx={{
            borderRadius: "20px",
            backgroundColor: "#f0f0f0",
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }} >
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        defaultValue=""
        onChange={handleCategoryChange}
        renderValue={(selected) => selected || 'Category'}
      >
        <MenuItem value="All">All</MenuItem>
        {categories.map((category) => (
          <MenuItem value={category.name} key={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div>
  );
};

export default CategoryFilter;
