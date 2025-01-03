import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Auth from "./components/pages/auth/Auth.tsx";
import Dash from "./components/pages/dashboard/Dash.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dash />}>
          <Route path="" element={<Navigate to="analyticsall" replace />} />{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
