import { Container, Typography } from "@mui/material";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";
import React, { useEffect } from "react";

const App = () => {
  // Ensure the background is applied globally
  useEffect(() => {
    // Apply background styles to html and body elements
    document.documentElement.style.height = "100%"; // Make html take full height
    document.body.style.margin = "0"; // Remove margin
    document.body.style.padding = "0"; // Remove padding
    document.body.style.height = "100%"; // Ensure body takes full height
    document.body.style.background =
      "linear-gradient(to bottom right, #6a11cb, #2575fc)"; // Gradient background
    document.body.style.backgroundSize = "cover"; // Cover the page with gradient
    document.body.style.backgroundRepeat = "no-repeat"; // Prevent background repetition
    document.body.style.backgroundAttachment = "fixed"; // Fix the background during scroll
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "40px", // Added padding at the bottom
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          sx={{ color: "white" }}
        >
          Goal Tracker
        </Typography>
        <AddGoalForm />
        <GoalList />
      </Container>
    </div>
  );
};

export default App;
