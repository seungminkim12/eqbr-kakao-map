import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

import "../src/view/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
