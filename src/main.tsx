import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./App.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          colorPrimary: "#1B3A5C",
          colorSuccess: "#389E6E",
          colorWarning: "#D4A843",
          colorError: "#CF4A4A",
          colorInfo: "#4A90D9",
          borderRadius: 8,
        },
        components: {
          Table: {
            headerBg: "#F0F4F8",
            headerColor: "#1B3A5C",
            rowHoverBg: "#F7FAFD",
            headerSortActiveBg: "#E3EBF3",
            headerSortHoverBg: "#DDE6F0",
          },
          Button: {
            primaryShadow: "0 2px 8px rgba(27, 58, 92, 0.25)",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
