import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./ui-ext/styles/globalStyles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// redux imports
import storeConfig from "./redux/storeConfiguration";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={storeConfig}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
