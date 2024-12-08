import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Goal {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface GoalState {
  goals: Goal[];
}

// Helper functions for localStorage
const loadFromLocalStorage = (): GoalState => {
  try {
    const storedData = localStorage.getItem("goals");
    return storedData ? JSON.parse(storedData) : { goals: [] };
  } catch (error) {
    console.error("Failed to load from localStorage", error);
    return { goals: [] };
  }
};

const saveToLocalStorage = (state: GoalState) => {
  try {
    localStorage.setItem("goals", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
};

// Initial state is loaded from localStorage
const initialState: GoalState = loadFromLocalStorage();

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newGoal: Goal = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.goals.push(newGoal);
      saveToLocalStorage(state); // Save to localStorage
    },
    toggleGoal: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.id);
      if (goal) {
        const index = goal.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          goal.completedDates.splice(index, 1);
        } else {
          goal.completedDates.push(action.payload.date);
        }
      }
      saveToLocalStorage(state); // Save to localStorage
    },
    removeGoal: (state, action: PayloadAction<{ id: string }>) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload.id);
      saveToLocalStorage(state); // Save to localStorage
    },
  },
});

export const { addGoal, toggleGoal, removeGoal } = goalSlice.actions;
export default goalSlice.reducer;
