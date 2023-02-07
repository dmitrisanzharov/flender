import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import checkUserToken from "../../../helper/checkUserToken";
import { secretNameOfSession } from "../../../utils/allOther";
import { serverUrl, finlendersDB, mainDB } from "../../../utils/serverUrls";
import { investFinlendersDB, investment } from "../../../utils/routes";
import RedirectPage from "../../pages/RedirectPage/RedirectPage";
import { useNavigate } from "react-router-dom";

const InvestingPage = () => {
	const navigate = useNavigate();

	const [warning, setWarning] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const amount = useRef();

	async function handleInvest() {
		const fAmount = amount.current.value;

		// console.log("fAmount: ", fAmount);

		if (fAmount < 1) {
			// console.log("yes");
			setWarning(true);
			return;
		}

		// get rid or warning
		setWarning(false);

		// check token

		const checkIfValid = await checkUserToken(
			JSON.parse(sessionStorage.getItem(secretNameOfSession)).token
		);
		// console.log("checkIfValid: ", checkIfValid);

		// invest the moneyz - send: amount of investment, what user, what project
		if (checkIfValid) {
			// send money to projects
			await axios.post(serverUrl + finlendersDB + investFinlendersDB, {
				projectMongoId: JSON.parse(sessionStorage.getItem("investingProject"))
					._id,
				amountInCents: fAmount * 100,
			});
			// console.log(res.data);

			// update user investments, balance and transactions
			let res2 = await axios.patch(serverUrl + mainDB + investment, {
				userMongoId: JSON.parse(sessionStorage.getItem(secretNameOfSession))
					._id,
				amountInvestedInCents: fAmount * 100,
				projectName: JSON.parse(sessionStorage.getItem("investingProject"))
					.projectName,
			});
			// console.log(res2.data);

			// save new user
			const newUser = {
				...res2.data,
				token: JSON.parse(sessionStorage.getItem(secretNameOfSession)).token,
			};
			sessionStorage.setItem(secretNameOfSession, JSON.stringify(newUser));

			// investment was successful redirect
			setRedirect(true);

			//
		}

		// end of handleInvest function
	}

	// useEffects

	useEffect(() => {
		if (redirect === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			navigate("/user-dashboard");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect]);

	if (redirect) {
		return (
			<RedirectPage
				redirectFromPageName="investment"
				redirectToPageName="dashboard"
				text="Investment was a success!"
			/>
		);
	}

	return (
		<div className="addPadding">
			<h4>How much would you like to invest?</h4>
			<input type="number" ref={amount} min="0" />
			<button onClick={handleInvest}>invest</button>
			{warning && <div className="warningText">check amount entered</div>}
		</div>
	);
};

export default InvestingPage;
