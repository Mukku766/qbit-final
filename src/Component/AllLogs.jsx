import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AllLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({
    year: "",
    month: "",
    week: "",
    date: "",
  });

  const [searchEnabled, setSearchEnabled] = useState(false);
  const [clearEnabled, setClearEnabled] = useState(false);
  const token = Cookies.get("token");
console.log(token)
  const years = [new Date().getFullYear()];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getWeeksOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysAfterFirstWeek = daysInMonth - (7 - firstDay);
    const weeks = Math.ceil(daysAfterFirstWeek / 7) + 1;
    return Array.from({ length: weeks }, (_, index) => index + 1);
  };

  const handleFilterChange = (event) => {
    console.log("date is here", event.target.value)
    const { name, value } = event.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    setSearchEnabled(updatedFilter.year !== "" || updatedFilter.date !== "");
    const isClearEnabled = Object.values(updatedFilter).some(
      (value) => value !== ""
    );
    setClearEnabled(isClearEnabled);
  };

  const clearFilters = () => {
    setFilter({
      year: "",
      month: "",
      week: "",
      date: "",
    });
    setSearchEnabled(false);
    setClearEnabled(false);
  };

  const searchLogs = async () => {
   
    try {
      // Convert filter object keys to match backend expectations
      const modifiedFilter = {
        logYear: filter.year,
        logMonth: filter.month,
        logWeek: filter.week,
        logDate: filter.date,
      };
  
      console.log("Requesting logs with filter:", modifiedFilter); // Log the modified filter object
      const response = await axios.get(
        "https://qbitlog-trainee.onrender.com/api/user/search-logs",
        {
          params: modifiedFilter,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      console.log("Response data:", responseData);
  
      setLogs(responseData.logs); // Setting logs state with data received from the backend
      setSearchEnabled(true);

    } catch (error) {
      console.error("Error searching logs:", error);
    }
  };
  

  const weeks = getWeeksOfMonth(filter.year, months.indexOf(filter.month));

  return (
    <div>
      <Box className="Inner-Box-Layout">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
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
          <Grid item xs={12} sm={6} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
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
          <Grid item sm={6} xs={12} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
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
          <Grid item sm={6} xs={12} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Select Date
            </Typography>
            <TextField
              name="date"
              fullWidth
              type="date"
              variant="standard"
              value={filter.date}
              onChange={(e) =>
                handleFilterChange({
                  target: { name: "date", value: e.target.value },
                })
              }
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={searchLogs}
              sx={{
                borderRadius: "50px",
                bgcolor: "#858BC5",
                color: "#ffffff",
                marginRight: "8px",
                width: "100%",
              }}
              disabled={!searchEnabled}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "50px",
                bgcolor: "#858BC5",
                color: "#ffffff",
                width: "100%",
              }}
              onClick={clearFilters}
              disabled={!clearEnabled}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="Inner-Box-Layout" mt={6} style={{ display: "grid" }}>
        <TableContainer>
          <Table style={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#858BC5", textAlign: "center" }}>
                  Log Date
                </TableCell>
                <TableCell sx={{ color: "#858BC5", textAlign: "center" }}>
                  Hours
                </TableCell>
                <TableCell sx={{ color: "#858BC5", textAlign: "center" }}>
                  Minutes
                </TableCell>
                <TableCell sx={{ color: "#858BC5", textAlign: "center" }}>
                  Log Type
                </TableCell>
                <TableCell sx={{ color: "#858BC5", textAlign: "center" }}>
                  Project
                </TableCell>
                <TableCell sx={{ color: "#858BC5", textAlign: "center" }}>
                  Log Description
                </TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
  {logs && logs.length > 0 ? (
    logs.map((log, index) => (
      <TableRow key={index}>
        <TableCell sx={{ color: "#fff", textAlign: "center" }}>
          {log.logDate}
        </TableCell>
        <TableCell sx={{ color: "#fff", textAlign: "center" }}>
          {log.hours}
        </TableCell>
        <TableCell sx={{ color: "#fff", textAlign: "center" }}>
          {log.minutes}
        </TableCell>
        <TableCell sx={{ color: "#fff", textAlign: "center" }}>
          {log.logType}
        </TableCell>
        <TableCell sx={{ color: "#fff", textAlign: "center" }}>
          {log.project}
        </TableCell>
        <TableCell sx={{ color: "#fff", textAlign: "center" }}>
          {log.logDescription}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell sx={{ color: "white" }} colSpan={6}>
        {searchEnabled ? "No matching logs found" : "Loading..."}
      </TableCell>
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
