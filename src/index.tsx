import React from "react";
import ReactDOM from "react-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { App } from "./components/App";
import "./style.css";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
