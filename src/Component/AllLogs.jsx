import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { MenuItem, Typography, TextField, Button, Box, Grid } from '@mui/material'; // Import MenuItem here
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';


function AllLogs({ logs }) {

  const navigate = useNavigate(); 

  const [filter, setFilter] = useState({
    year: '',
    month: '',
    week: '',
    date: '',
  });

  const years = [new Date().getFullYear()];

    const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to get weeks of a month
  const getWeeksOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); // Day of the week of the 1st day
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
    const daysAfterFirstWeek = daysInMonth - (7 - firstDay);
    const weeks = Math.ceil(daysAfterFirstWeek / 7) + 1; // Add one for the first week
    return Array.from({ length: weeks }, (_, index) => index + 1);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const updatedFilter = { ...filter, [name]: value };
    // Enable submit button if year is selected or date is filled
    const isSubmitEnabled = updatedFilter.year !== '' || updatedFilter.date !== '';
    // Update state
    setFilter(updatedFilter);
    setSubmitEnabled(isSubmitEnabled);
  };
  

  const filteredLogs = logs ? logs.filter((log) => {
    if (filter.year && log.year !== filter.year) return false;
    if (filter.month && log.month !== filter.month) return false;
    if (filter.week && log.week !== filter.week) return false;
    if (filter.date && log.date !== filter.date) return false;
    return true;
  }) : [];


  const [submitEnabled, setSubmitEnabled] = useState(false);

  const weeks = getWeeksOfMonth(filter.year, months.indexOf(filter.month));
const token = Cookies.get('token')
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])
  return (
    <div>
      <Box p={3} mt={15} ml={2} mr={2} boxShadow={6} borderRadius={4} style={{ backdropFilter: 'blur(12px)', color: '#ffffff' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}  md={3}>
            <Typography color={'#fff'} sx={{ my: 1 }}>
              Select Year
            </Typography>
            <TextField
              name="year"
              select
              fullWidth
              value={filter.year}
              onChange={handleFilterChange}
              variant="standard"
              
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}  md={3}>
            <Typography color={'#fff'} sx={{ my: 1 }}>
              Select Month
            </Typography>
            <TextField
              name="month"
              select
              fullWidth
              value={filter.month}
              onChange={handleFilterChange}
              variant="standard"
             
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6} xs={12} md={3}>
            <Typography color={'#fff'} sx={{ my: 1 }}>
              Select Week
            </Typography>
            <TextField
              name="week"
              select
              fullWidth
              value={filter.week}
              onChange={handleFilterChange}
              variant="standard"
             
            >
              {weeks.map((week) => (
                <MenuItem key={week} value={week}>
                  Week {week}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6} xs={12} md={3}>
            <Typography color={'#fff'} sx={{ my: 1 }}>
              Select Date
            </Typography>
            <TextField
              name="date"
              fullWidth
              type="date"
              variant="standard"
              value={filter.date}
              onChange={handleFilterChange}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <Button
  variant="contained"
  color="primary"
  sx={{ borderRadius: '50px', bgcolor: '#858BC5', color: '#ffffff' }}
  disabled={!submitEnabled}
>
  Submit
</Button>

          </Grid>
        </Grid>
      </Box>
      <Box p={3} mt={6} ml={2} mr={2} boxShadow={6} borderRadius={4} style={{ backdropFilter: 'blur(12px)', color: '#000000' }}>
        <TableContainer>
          <Table>
            <TableHead>{/* Table header */}</TableHead>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <TableRow key={index}>{/* Table cells */}</TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{color:"white"}} colSpan={7}>No logs found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default AllLogs;
