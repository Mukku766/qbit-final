import React, { useState, useEffect } from "react";
import { Container, Button, Box } from "@mui/material";
import LogInputFields from "./LogInputFields";
import LogTable from "./LogTable";
import axios from "axios";
import Cookies from "js-cookie";

function AddLogsComponent() {
  const [logDate, setLogDate] = useState("");
  const [logType, setLogType] = useState("");
  const [project, setProject] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [logDescription, setLogDescription] = useState("");
  const [logs, setLogs] = useState([]);
  const [selectedLogIndex, setSelectedLogIndex] = useState(null);
  const [isUpdate, setIsUpdated] = useState(false);
const[reload,setReload] = useState(false)
const token = Cookies.get("token");

  const handleLogDateChange = (event) => {
    setLogDate(event.target.value);
  };

  const handleLogTypeChange = (event) => {
    setLogType(event.target.value);
  };

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleLogDescriptionChange = (event) => {
    setLogDescription(event.target.value);
  };


  function refresh(){
    setReload(!reload)
  }

  const fetchLogs = async () => {
    try {
     

      const response = await axios.get(
        "https://qbitlog-trainee.onrender.com/api/user/fetch-log",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!Array.isArray(response.data)) {
        console.error(
          "Invalid response format - expected an array:",
          response.data
        );
        setLogs([]); // Set logs to empty array if response is not an array
        return;
      }
      console.log(response.data);
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  // useEffect(() => {
  //   fetchLogs();
  // }, [logs]); // Add logs as dependency to useEffect

  useEffect(() => {
    fetchLogs();
  }, [reload]);

  const handleAddLog = () => {
    // const formattedLogDate = `${logDate.split("-")[2]}-${
    //   logDate.split("-")[1]
    // }-${logDate.split("-")[0]}`;

    let newLog;

    if (isUpdate) {
      newLog = {
        logDate: logDate,
        logType: logType,
        project: project,
        hours: hours,
        minutes: minutes,
        logDescription: logDescription,
        _id: selectedLogIndex,
      };
    } else {
      newLog = {
        logDate: logDate,
        logType: logType,
        project: project,
        hours: hours,
        minutes: minutes,
        logDescription: logDescription,
      };
    }

    if (selectedLogIndex !== null) {
      const updatedLogs = [...logs];
      updatedLogs[selectedLogIndex] = newLog;
      setLogs(updatedLogs);
      setSelectedLogIndex(null);
    } else {
      setLogs([...logs, newLog]);
    }

    clearInputFields();
    console.log("After clear input");
    
    // Call API to add or update log
    addLogToServer(newLog, token);
  };

  const addLogToServer = async (newLog, token) => {
    try {
      console.log("newLog", newLog);
      console.log("token", token);
      // Make POST request to your API endpoint with authentication headers
      if (newLog?._id) {
        let response = await axios.patch(
          `https://qbitlog-trainee.onrender.com/api/user/update-log/${newLog._id}`,
          newLog,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsUpdated(!isUpdate);
        console.log(
          `Log ${newLog?._id ? `Updated` : `Added`} successfully:`,
          response.data
        );
      } else {
        let response = await axios.post(
          "https://qbitlog-trainee.onrender.com/api/user/add-log",
          newLog,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsUpdated(!isUpdate);
        console.log(
          `Log ${newLog?._id ? `Updated` : `Added`} successfully:`,
          response.data
        );
      }
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      // Assuming you have the authentication token stored in a variable called authToken
      const authToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjBkMzUwMzI5YjQxODRhMTliYjM1MzMiLCJpYXQiOjE3MTM3NjE1MzAsImV4cCI6MTcxMzg0NzkzMH0.phz7zoWW85ChJlE7v2pNZDiVQXqqpNyka4ZRUFzK0ZU";
      // Configure Axios to send the authentication token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      console.log("This log is deleting");
      console.log(id);
      // Send the DELETE request with the log ID in the URL
      await axios.delete(
        `https://qbitlog-trainee.onrender.com/api/user/delete-log/${id}`,
        config
      );
      console.log(id);
      reload();
      // If the request is successful, update the logs state by filtering out the deleted log
      setLogs(logs.filter((log) => log.id !== id));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const handleEditLog = (index) => {
    const selectedLog = logs[index];
    reload();
    console.log("Here is the selected log:", selectedLog);
    setLogDate(selectedLog?.logDate);
    setLogType(selectedLog?.logType);
    setProject(selectedLog?.project);
    setHours(selectedLog?.hours);
    setMinutes(selectedLog?.minutes);
    setLogDescription(selectedLog?.logDescription);
    setSelectedLogIndex(selectedLog?._id);
    setIsUpdated(true);
  };

  const clearInputFields = () => {
    setLogDate("");
    setLogType("");
    setProject("");
    setHours("");
    setMinutes("");
    setLogDescription("");
  };

  const calculateTotalTimeInTable = () => {
    let total = 0;
    logs.forEach((log) => {
      total += parseInt(log.hours) + parseInt(log.minutes) / 60;
    });
    return total;
  };

  const handleSubmitLogs = async () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjBkMzUwMzI5YjQxODRhMTliYjM1MzMiLCJpYXQiOjE3MTM3NjE1MzAsImV4cCI6MTcxMzg0NzkzMH0.phz7zoWW85ChJlE7v2pNZDiVQXqqpNyka4ZRUFzK0ZU";
    try {
      const response = await axios.post(
        "https://qbitlog-trainee.onrender.com/api/user/submit-log",
        {
          logDate,
          logType,
          project,
          hours,
          minutes,
          logDescription,
        },

        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include authentication token
          },
        }
      );
      console.log("Log added successfully:", response.data);
      // Optionally, you can fetch logs again to update the UI with the latest data
refresh();

    } catch (error) {
      console.error("Error adding log:", error);
      // Handle error and provide feedback to the user
    }
  };

  const isButtonDisabled = !(
    logDate &&
    logType &&
    project &&
    hours &&
    minutes &&
    logDescription
  );
  const isButtonDisabledd = !(calculateTotalTimeInTable() >= 8);

  return (
    <>
      <Box className="Inner-Box-Layout">
        <LogInputFields
          logDate={logDate}
          hours={hours}
          minutes={minutes}
          logType={logType}
          project={project}
          logDescription={logDescription}
          handleLogDateChange={handleLogDateChange}
          handleHoursChange={handleHoursChange}
          handleMinutesChange={handleMinutesChange}
          handleLogTypeChange={handleLogTypeChange}
          handleProjectChange={handleProjectChange}
          handleLogDescriptionChange={handleLogDescriptionChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddLog}
          disabled={isButtonDisabled}
          sx={{ mt: 2, borderRadius: "50px", bgcolor: "#858BC5" }}
        >
          {isUpdate == false ? "Add Log" : "Update Log"}
        </Button>
      </Box>
      <Box className="Inner-Box-Layout" mt={6}>
        <Box style={{ display: "grid" }}>
          <LogTable
            logs={logs}
            handleDeleteLog={handleDeleteLog}
            handleEditLog={handleEditLog}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitLogs}
          disabled={isButtonDisabledd}
          sx={{ mt: 2, borderRadius: "50px", bgcolor: "#858BC5" }}
        >
          Submit Logs
        </Button>
      </Box>
    </>
  );
}

export default AddLogsComponent;
