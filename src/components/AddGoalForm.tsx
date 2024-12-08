import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store";
import { addGoal } from "../goalSlice";

const AddGoalForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addGoal({ name, frequency }));

      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Goal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter goal name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            sx={{ mt: 2 }}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="secondary">
          Add Goal
        </Button>
      </Box>
    </form>
  );
};

export default AddGoalForm;
