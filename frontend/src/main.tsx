import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Auth from "./components/pages/auth/Auth.tsx";
import Dash from "./components/pages/dashboard/Dash.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import Main from "./components/pages/dashboard/Main.tsx";
import { ProtectedRoute } from "./hooks/Protected.tsx";
import Mail from "./components/pages/dashboard/Mail.tsx";
import EmailServices from "./components/pages/dashboard/EmailServices.tsx";
import Statistics from "./components/pages/dashboard/Statistics.tsx";
import Form from "./components/pages/dashboard/Form/Form.tsx";
import axios from "axios";
import { CONFIG } from "./lib/config.ts";

export const fetcher = axios.create({
  baseURL:CONFIG.BACKEND_URL,
  withCredentials:true
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dash />}>
              <Route path="" element={<Navigate to="main" replace />} />{" "}
              <Route path="/dashboard/main" element={<Main />} />
              <Route path="/dashboard/forms" element={<Form />} />
              <Route path="/dashboard/mail" element={<Mail />} />
              <Route
                path="/dashboard/email-services"
                element={<EmailServices />}
              />
              <Route path="/dashboard/statics" element={<Statistics />} />
              <Route path="/dashboard/settings" element={<Main />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
