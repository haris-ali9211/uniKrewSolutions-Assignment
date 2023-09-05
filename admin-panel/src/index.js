import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { OpulentSipsProvider } from "./context/OpulentSipsContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <OpulentSipsProvider>
        <App />
      </OpulentSipsProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
