import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import { KeycloakProvider } from "./KeycloakProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <KeycloakProvider>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </KeycloakProvider>
);



