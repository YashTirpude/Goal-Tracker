import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Goal, removeGoal, toggleGoal } from "../goalSlice";

const GoalList = () => {
  const { goals } = useSelector((state: RootState) => state.goals);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch<AppDispatch>();

  const getStreak = (goal: Goal) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = new Date(currentDate).toISOString().split("T")[0];
      if (goal.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getProgress = (goal: Goal) => {
    const maxDays = goal.frequency === "daily" ? 30 : 4;
    return Math.min((getStreak(goal) / maxDays) * 100, 100);
  };

  if (goals.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4, color: "white" }}>
        No goals yet. Start by adding a new goal!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {goals.map((goal) => (
        <Paper
          key={goal.id}
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: "#2a2a2a", // Dark background for the goal cards
            color: "white", // Ensure text is white for readability
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Grid container alignItems="center">
            <Grid xs={12} sm={6}>
              <Typography
                variant="h6"
                component="div"
                sx={{ textTransform: "capitalize" }}
              >
                {goal.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {goal.frequency}
              </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    goal.completedDates.includes(today)
                      ? "success"
                      : "secondary"
                  }
                  startIcon={<CheckCircle />}
                  onClick={() =>
                    dispatch(toggleGoal({ id: goal.id, date: today }))
                  }
                  aria-label={`Mark goal "${goal.name}" as ${
                    goal.completedDates.includes(today)
                      ? "incomplete"
                      : "complete"
                  }`}
                  sx={{
                    borderColor: goal.completedDates.includes(today)
                      ? "#4caf50" // Green for completed
                      : "#ffb74d", // Yellow for incomplete
                    color: goal.completedDates.includes(today)
                      ? "#4caf50"
                      : "#ffb74d",
                    "&:hover": {
                      backgroundColor: goal.completedDates.includes(today)
                        ? "#388e3c"
                        : "#ff9800",
                      color: "white",
                    },
                  }}
                >
                  {goal.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => dispatch(removeGoal({ id: goal.id }))}
                  aria-label={`Remove goal "${goal.name}"`}
                  sx={{
                    borderColor: "#f44336", // Red for remove button
                    color: "#f44336",
                    "&:hover": {
                      backgroundColor: "#e53935",
                      color: "black", // Darker red on hover
                    },
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current Streak: {getStreak(goal)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={getProgress(goal)}
              sx={{
                mt: 1,
                backgroundColor: "#3e3e3e", // Dark background for progress bar
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4caf50", // Green progress for daily
                },
              }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default GoalList;
