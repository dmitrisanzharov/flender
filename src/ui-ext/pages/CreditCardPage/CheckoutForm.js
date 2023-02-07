import React, { useState } from "react";

// stripe imports
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";

// redux imports
import { useSelector } from "react-redux";

const CheckoutForm = () => {
	// redux stuff
	const lodgementAmountEnteredState = useSelector(
		(state) => state.generalStore.lodgementAmountEntered
	);

	// stripe stuff
	const stripe = useStripe();
	const elements = useElements();

	// local states
	const [redirecting, setRedirecting] = useState(false);

	// functions
	async function handleSubmit(e) {
		e.preventDefault();

		if (!stripe || !elements) {
			console.log("wait a bit more");
			return;
		}

		// save amount for notifications
		sessionStorage.setItem("amount", lodgementAmountEnteredState);

		// notify user that he is being redirected to another page
		setRedirecting(true);

		const res = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/payment-confirmation`, // because this redirect happens redux states reset
			},
		});

		console.log("res", res);

		// handle error
		if (res.error) {
			setRedirecting(false);
		}
	}

	// HTML

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<PaymentElement />
				<br />
				<button disabled={!stripe || redirecting}>
					pay €{lodgementAmountEnteredState} euro
				</button>
				{redirecting && (
					<div style={{ color: "green", fontWeight: "bold", fontSize: "30px" }}>
						You are being redirected please wait
					</div>
				)}
			</form>
		</div>
	);
};

export default CheckoutForm;
