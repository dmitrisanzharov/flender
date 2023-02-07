import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	changeLodgementAmountEntered,
	changeUserLoggedInStateToFalseAndRemoveUserData,
} from "../../../redux/generalStore";
import checkUserToken from "../../../helper/checkUserToken";
import RedirectPage from "../RedirectPage/RedirectPage";
import axios from "axios";
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { stripePaymentIntent } from "../../../utils/routes";

import { useNavigate } from "react-router-dom";

// pages
import CheckoutForm from "./CheckoutForm";

// stripe stuff
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// stripe promise
const stripePromise = loadStripe("pk_test_2NihlJ80LshbzX9QHEeF6Cj8");

const CreditCardPage = () => {
	// variables
	const navigate = useNavigate();

	// redux
	const dispatch = useDispatch();
	const lodgementAmountEnteredState = useSelector(
		(state) => state.generalStore.lodgementAmountEntered
	);
	const userData = useSelector((state) => state.generalStore.userData);

	// state
	const [userNotAuthorised, setUserNotAuthorised] = useState(false);
	const [clientSecretState, setClientSecretState] = useState("");

	// functions

	// useEffects

	useEffect(() => {
		async function checkTokenAndGetClientSecret() {
			console.log("handleLodgement triggered");

			// remove BUG where if we click on BACK button it will try to lodge again
			if (lodgementAmountEnteredState === "") {
				navigate("/add-funds");
				return;
			}

			// check to see if token is authorised
			let checkIt = await checkUserToken(userData.token);
			console.log("user token check outcome", checkIt);

			if (!checkIt) {
				setUserNotAuthorised(true);
				dispatch(changeLodgementAmountEntered(""));
				dispatch(
					changeUserLoggedInStateToFalseAndRemoveUserData({
						showLogOutNotification: false,
					})
				);
				return;
			}

			// handle the payment intent
			const res = await axios.post(serverUrl + mainDB + stripePaymentIntent, {
				amount: lodgementAmountEnteredState,
				flenderId: userData.flenderId,
				mongoId: userData._id,
				email: userData.email,
			});

			console.log(res.data);

			// save client secret in a state
			setClientSecretState(res.data);

			// END HERE
		}

		checkTokenAndGetClientSecret();
	}, [
		dispatch,
		lodgementAmountEnteredState,
		userData._id,
		userData.email,
		userData.flenderId,
		userData.token,
		navigate,
	]);

	// HTML

	if (userNotAuthorised) {
		return (
			<RedirectPage
				redirectFromPageName="credit card"
				text="you are not authorised, you will be logged out and redirected to Login page"
			/>
		);
	}

	if (clientSecretState) {
		return (
			<div className="addPadding">
				<h1>Please enter credit card details below</h1>
				<Elements
					stripe={stripePromise}
					options={{ clientSecret: clientSecretState }}
				>
					<CheckoutForm />
				</Elements>
			</div>
		);
	}

	return (
		<div className="addPadding">
			<h1>pending request please wait</h1>
		</div>
	);
};

export default CreditCardPage;
