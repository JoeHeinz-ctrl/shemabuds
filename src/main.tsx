
import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter.tsx";
import "./styles/fonts.css";
import "./styles/index.css";
import "./utils/seedDemoProducts"; // Make seeder available in console
import "./utils/testFirebase"; // Make Firebase test available in console

createRoot(document.getElementById("root")!).render(<AppRouter />);
  