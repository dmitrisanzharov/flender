import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	extractUserNotificationFromSessionStorage,
	addToNotifications,
} from "../../../redux/generalStore";
import axios from "axios";
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { confirmLodgement } from "../../../utils/routes";
import { secretNameOfSession } from "../../../utils/allOther";

const PaymentConfirmation = () => {
	// variables and all other
	const stripe = useStripe();

	// state
	const [message, setMessage] = useState("pending");

	// redux
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.generalStore.userData);

	// router
	let navigate = useNavigate();

	// useEffect

	useEffect(() => {
		// reset userNotifications
		dispatch(extractUserNotificationFromSessionStorage());

		// check if stripe is loaded
		if (!stripe) {
			setMessage("need to wait a bit more");
			return;
		}

		// make the payment
		async function getStripePaymentStatus() {
			// save token
			const token = userData.token;

			// client secret
			const clientSecret = new URLSearchParams(window.location.search).get(
				"payment_intent_client_secret"
			);
			console.log("clientSecret: ", clientSecret);

			// use the secret to extract info on payment status
			let res = await stripe.retrievePaymentIntent(clientSecret);
			console.log("res: ", res.paymentIntent);

			// handle outcome

			if (res.paymentIntent.status === "succeeded") {
				// add notifications
				dispatch(
					addToNotifications(`lodged €${sessionStorage.getItem("amount")}`)
				);
				sessionStorage.removeItem("amount");

				// update mongoDB and reset user info in sessionStorage

				async function updateUserInMongoDB() {
					const mongoIdStr = JSON.parse(res.paymentIntent.description);
					console.log("mongoIdStr: ", mongoIdStr);

					let res2 = await axios.patch(serverUrl + mainDB + confirmLodgement, {
						paymentId: res.paymentIntent.id,
						amountInCents: res.paymentIntent.amount,
						mongoId: mongoIdStr.mongoId,
						time: res.paymentIntent.time,
					});
					sessionStorage.setItem(
						secretNameOfSession,
						JSON.stringify({ ...res2.data, token: token })
					);
				}

				updateUserInMongoDB();

				// change state to redirect
				setMessage("Success");
				return;
			}

			if (res.paymentIntent.status === "processing") {
				setMessage("Processing");
				return;
			}

			if (res.paymentIntent.status === "requires_payment_method") {
				setMessage("requires_payment_method");
			}
		}

		getStripePaymentStatus();
	}, [stripe, dispatch]);

	useEffect(() => {
		if (message === "Success") {
			const timeOut = setTimeout(() => {
				navigate("/user-dashboard");
			}, 2000);
			return () => clearTimeout(timeOut);
		}
	}, [message, navigate]);

	return (
		<div>
			<h1>PaymentStatus</h1>
			<h2>Payment status is: {message}</h2>
			{message === "Success" && (
				<h2 style={{ color: "green" }}>
					You are being redirected to DASHBOARD
				</h2>
			)}
		</div>
	);
};

export default PaymentConfirmation;
