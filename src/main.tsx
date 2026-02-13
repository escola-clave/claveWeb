import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Limpa todo o cache do navegador a cada refresh (F5)
localStorage.clear();

createRoot(document.getElementById("root")!).render(<App />);