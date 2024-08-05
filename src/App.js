import React from "react";
// Ensure React is imported
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WeatherCard from "./components/WeatherCard"; // Check the path

const theme = createTheme({
  typography: {
    fontFamily: ["Cairo"],
  },
});

function App() {
 
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WeatherCard />
      </ThemeProvider>
    </div>
  );
}

export default App;
