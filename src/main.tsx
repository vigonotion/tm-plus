import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Theme appearance="dark" accentColor="tomato" radius="large">
        <App />
      </Theme>
    </StrictMode>,
  );
}
