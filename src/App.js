import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// redux

// Pages
import Home from "./ui-ext/pages/Home/Home";
import Register from "./ui-ext/pages/Register/Register";
import Login from "./ui-ext/pages/Login/Login";
import UserDashboard from "./ui-ext/pages/UserDashboard/UserDashboard";
import Practice from "./ui-ext/pages/Practice/Practice";
import ForgotPassword from "./ui-ext/pages/ForgotPassword/ForgotPassword";
import DevPage from "./ui-ext/pages/DevPage/DevPage";
import Withdraw from "./ui-ext/pages/Withdraw/Withdraw";
import AddFunds from "./ui-ext/pages/AddFunds/AddFunds";
import SettingsPage from "./ui-ext/pages/SettingsPage/SettingsPage";
import CreditCardPage from "./ui-ext/pages/CreditCardPage/CreditCardPage";
import PaymentConfirmation from "./ui-ext/pages/PaymentConfirmation/PaymentConfirmation";
import Transactions from "./ui-ext/pages/Transactions/Transactions";
import Marketplace from "./ui-ext/pages/Marketplace/Marketplace";
import SingleProject from "./ui-ext/pages/SingleProject/SingleProject";
import InvestingPage from "./ui-ext/pages/InvestingPage/InvestingPage";

// components
import NavBar from "./ui-ext/components/NavBar/NavBar";
import LoggedInNavBar from "./ui-ext/components/LoggedInNavBar/LoggedInNavBar";
import MaybeShowNavBar from "./ui-ext/components/MaybeShowNavBar/MaybeShowNavBar";
import PasswordReset from "./ui-ext/pages/PasswordReset/PasswordReset";
import FooterMid from "./ui-ext/components/FooterMid/FooterMid";
import MaybeShowFooterMid from "./ui-ext/components/MaybeShowFooterMid/MaybeShowFooterMid";
import MaybeShowLoggedInNavBar from "./ui-ext/components/MaybeShowLoggedInNavBar/MaybeShowLoggedInNavBar";
import RoutesMonitorGlobal from "./ui-ext/components/RoutesMonitorGlobal/RoutesMonitorGlobal";

// stripe stuff
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// stripe promise
const stripePromise = loadStripe("pk_test_2NihlJ80LshbzX9QHEeF6Cj8");

function App() {
	// redux

	// variables

	// useEffects

	return (
		<>
			<Router>
				<RoutesMonitorGlobal />
				<MaybeShowLoggedInNavBar>
					<LoggedInNavBar />
				</MaybeShowLoggedInNavBar>
				<MaybeShowNavBar>
					<NavBar />
				</MaybeShowNavBar>

				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/practice" element={<Practice />} />
					<Route exact path="/devpage" element={<DevPage />} />
					<Route exact path="/add-funds" element={<AddFunds />} />
					<Route exact path="/withdraw" element={<Withdraw />} />
					<Route exact path="/user-dashboard" element={<UserDashboard />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/forgot-password" element={<ForgotPassword />} />
					<Route
						exact
						path="/password-reset/:token"
						element={<PasswordReset />}
					/>
					<Route exact path="/settings" element={<SettingsPage />} />
					<Route exact path="/credit-card-page" element={<CreditCardPage />} />
					<Route
						exact
						path="/payment-confirmation"
						element={
							<Elements stripe={stripePromise}>
								<PaymentConfirmation />
							</Elements>
						}
					/>
					<Route exact path="/transactions" element={<Transactions />} />
					<Route exact path="/marketplace" element={<Marketplace />} />
					<Route
						exact
						path="/campaigns/:projectNameUrl"
						element={<SingleProject />}
					/>
					<Route exact path="/investing-page" element={<InvestingPage />} />
				</Routes>
				<MaybeShowFooterMid>
					<FooterMid />
				</MaybeShowFooterMid>
			</Router>
		</>
	);
}

export default App;
