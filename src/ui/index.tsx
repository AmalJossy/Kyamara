import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./popup/Popup";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
