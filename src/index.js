import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import rootReducer from "./modules";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
