import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { store } from "./services/store";

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container!);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
