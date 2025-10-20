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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
} from "@mui/material";

const vans = [
  { id: "68ca57b2b1f408f198b1768a", name: "Van #1" },
  { id: "68ca57b2b1f408f198b1768b", name: "Van #2" },
  { id: "68ca57b2b1f408f198b1768c", name: "Van #3" },
];

const daysList = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export default function RoutePlannerForm(): React.JSX.Element {
  const [vanId, setVanId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [tripType, setTripType] = React.useState("");
  const [tripDays, setTripDays] = React.useState<Record<string, boolean>>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });
  const [startPoint, setStartPoint] = React.useState({ lat: "", long: "" });
  const [endPoint, setEndPoint] = React.useState({ lat: "", long: "" });

  const handleDayChange = (day: string) => {
    setTripDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSubmit = () => {
    console.log({
      vanId,
      title,
      startTime,
      tripType,
      tripDays,
      startPoint,
      endPoint,
    });
    alert("Trip data logged in console!");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Add Route</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="van-select-label">Van</InputLabel>
                <Select
                  labelId="van-select-label"
                  value={vanId}
                  label="Van"
                  onChange={(e: SelectChangeEvent) => setVanId(e.target.value)}
                >
                  {vans.map((v) => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="trip-type-label">Trip Type</InputLabel>
                <Select
                  labelId="trip-type-label"
                  value={tripType}
                  label="Trip Type"
                  onChange={(e: SelectChangeEvent) => setTripType(e.target.value)}
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography>Trip Days</Typography>
                <FormGroup row>
                  {daysList.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={tripDays[day]}
                          onChange={() => handleDayChange(day)}
                        />
                      }
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Start Lat"
                fullWidth
                value={startPoint.lat}
                onChange={(e) =>
                  setStartPoint((prev) => ({ ...prev, lat: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Start Long"
                fullWidth
                value={startPoint.long}
                onChange={(e) =>
                  setStartPoint((prev) => ({ ...prev, long: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="End Lat"
                fullWidth
                value={endPoint.lat}
                onChange={(e) =>
                  setEndPoint((prev) => ({ ...prev, lat: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="End Long"
                fullWidth
                value={endPoint.long}
                onChange={(e) =>
                  setEndPoint((prev) => ({ ...prev, long: e.target.value }))
                }
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
    fullWidth
  >
    Submit
  </Button>
</Grid>

        </Stack>
      </Card>
    </Box>
  );
}
