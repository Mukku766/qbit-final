import React, { useState } from "react";
import { Container, Button, Box } from "@mui/material";
import LogInputFields from "./LogInputFields";
import LogTable from "./LogTable";

function AddLogsComponent() {
  const [logDate, setLogDate] = useState("");
  const [logType, setLogType] = useState("");
  const [project, setProject] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [logDescription, setLogDescription] = useState("");
  const [logs, setLogs] = useState([]);
  const [selectedLogIndex, setSelectedLogIndex] = useState(null);

  const handleLogDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) {
      setLogDate(today.toISOString().split("T")[0]);
    } else {
      setLogDate(selectedDate.toISOString().split("T")[0]);
    }
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

  const handleAddLog = () => {
    const newLog = {
      logDate,
      logType,
      project,
      hours,
      minutes,
      logDescription,
    };

    if (selectedLogIndex !== null) {
      const updatedLogs = [...logs];
      updatedLogs[selectedLogIndex] = newLog;
      setLogs(updatedLogs);
      setSelectedLogIndex(null);
    } else {
      setLogs([...logs, newLog]);
    }

    clearInputFields();
  };

  const handleDeleteLog = (index) => {
    const updatedLogs = [...logs];
    updatedLogs.splice(index, 1);
    setLogs(updatedLogs);
  };

  const handleEditLog = (index) => {
    if (index >= 0 && index < logs.length) {
      const selectedLog = logs[index];
      setLogDate(selectedLog.logDate);
      setLogType(selectedLog.logType);
      setProject(selectedLog.project);
      setHours(selectedLog.hours);
      setMinutes(selectedLog.minutes);
      setLogDescription(selectedLog.logDescription);
      setSelectedLogIndex(index);
    }
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

  const handleSubmitLogs = () => {
    const totalTimeInTable = calculateTotalTimeInTable();
    console.log("Submitting logs...");
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
          sx={{ mt: 2, mr: 2, borderRadius: "50px", bgcolor: "#858BC5" }}
        >
          {selectedLogIndex !== null ? "Update Log" : "Add Log"}
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
