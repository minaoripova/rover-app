import React from 'react';
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Rovers } from "./components/Rovers";
import { Rover } from "./components/Rover";

function App() {
  console.log(process.env)
  const theme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Navigate to="/rovers" replace={true} />}/>
              <Route path="rovers" element={<Rovers />} />
              <Route path="rover/:roverName" element={<Rover />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
