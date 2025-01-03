import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Auth from "./components/pages/auth/Auth.tsx";
import Dash from "./components/pages/dashboard/Dash.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/pages/dashboard/Main.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dash />}>
            <Route path="" element={<Navigate to="main" replace />} />{" "}
            <Route path="/dashboard/main" element={<Main />} />
            <Route path="/dashboard/mail" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
