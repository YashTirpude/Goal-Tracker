import { Container, Typography } from "@mui/material";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";
import React, { useEffect } from "react";

const App = () => {
  // Ensure the background is applied globally
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100vh";
    document.body.style.background =
      "linear-gradient(to bottom right, #6a11cb, #2575fc)";
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        {/* Stylish and Colorful Title */}
        <Typography
          component="h1"
          variant="h2"
          align="center"
          sx={{
            background: "linear-gradient(to right, #ff8c00, #ff00b3)", // New vibrant gradient
            WebkitBackgroundClip: "text", // For gradient to apply to text
            color: "transparent", // Makes the text transparent to show the gradient
            fontWeight: 700, // Bold font weight
            fontSize: "3rem", // Larger font size
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)", // Subtle text shadow
            fontFamily: '"Roboto", sans-serif', // Clean, modern font
            letterSpacing: "2px", // Adds spacing between letters for style
          }}
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
