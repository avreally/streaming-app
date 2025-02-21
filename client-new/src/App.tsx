import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AllTracks from "./components/AllTracks/AllTracks";
import "./App.css";

const App = () => {
  return (
    <StrictMode>
      <AllTracks />
    </StrictMode>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
