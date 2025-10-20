"use client";

import * as React from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Button,
  Grid,
} from "@mui/material";

// Dummy data for dropdowns
const parents = [
  { id: "p1", name: "Mr. Khan" },
  { id: "p2", name: "Mrs. Ahmed" },
  { id: "p3", name: "Mr. Ali" },
];

const vans = [
  { id: "v1", name: "Van #1" },
  { id: "v2", name: "Van #2" },
  { id: "v3", name: "Van #3" },
];

export default function AddAlertForm(): React.JSX.Element {
  const [alertType, setAlertType] = React.useState("");
  const [recipientType, setRecipientType] = React.useState("");
  const [recipientId, setRecipientId] = React.useState(""); // selected parent/van
  const [message, setMessage] = React.useState("");

  const handleSubmit = () => {
    const data = {
      alertType,
      recipientType,
      recipientId: recipientId || null,
      message,
    };
    console.log("Alert submitted:", data);
    alert("Alert data logged in console!");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Add / Edit Alert</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Alert Type"
                fullWidth
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="recipient-type-label">Send To</InputLabel>
                <Select
                  labelId="recipient-type-label"
                  value={recipientType}
                  label="Send To"
                  onChange={(e: SelectChangeEvent) => {
                    setRecipientType(e.target.value);
                    setRecipientId(""); // reset selected
                  }}
                >
                  <MenuItem value="ALL_PARENTS">All Parents</MenuItem>
                  <MenuItem value="ALL_DRIVERS">All Drivers</MenuItem>
                  <MenuItem value="SPECIFIC_PARENT">Specific Parent</MenuItem>
                  <MenuItem value="SPECIFIC_VAN">Specific Van</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Conditional dropdown */}
            {(recipientType === "SPECIFIC_PARENT" || recipientType === "SPECIFIC_VAN") && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="recipient-id-label">
                    {recipientType === "SPECIFIC_PARENT" ? "Select Parent" : "Select Van"}
                  </InputLabel>
                  <Select
                    labelId="recipient-id-label"
                    value={recipientId}
                    label={recipientType === "SPECIFIC_PARENT" ? "Select Parent" : "Select Van"}
                    onChange={(e: SelectChangeEvent) => setRecipientId(e.target.value)}
                  >
                    {(recipientType === "SPECIFIC_PARENT" ? parents : vans).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="Message"
                fullWidth
                multiline
                minRows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Box>
  );
}
