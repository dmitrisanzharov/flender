import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import checkUserToken from "../../../helper/checkUserToken";
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { withdrawal } from "../../../utils/routes";
import { secretNameOfSession } from "../../../utils/allOther";
import calcAvailableBalance from "../../../helper/calAvailableBalance";

// redux stuff
import {
	tokenNotValid_LogoutUser_ClearAllSessionData,
	addToNotifications,
} from "../../../redux/generalStore";
import { useSelector, useDispatch } from "react-redux";

// pages
import RedirectPage from "../RedirectPage/RedirectPage";

const Withdraw = () => {
	// all other
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// states
	const userData = useSelector((state) => state.generalStore.userData);
	const [input, setInput] = useState("");
	const [showWarning, setShowWarning] = useState(false);
	const [warningText, setWarningText] = useState("");
	const [tokenIsInvalid, setTokenIsInvalid] = useState(false);
	const [redirect, setRedirect] = useState(false);

	// functions
	async function handleWithdrawal() {
		try {
			// check user token
			let tokenValid = checkUserToken(userData.token);

			// handle if token invalid
			if (!tokenValid) {
				setTokenIsInvalid(true);
				return;
			}

			let res = await axios.patch(serverUrl + mainDB + withdrawal, {
				amountInCents: input * 100,
				mongoId: userData._id,
			});
			console.log("res: ", res.data);

			// update userData in session, state will be automatic
			sessionStorage.setItem(secretNameOfSession, JSON.stringify(res.data));

			// redirect the user
			setRedirect(true);
		} catch (error) {
			console.log(error);
		}
	}

	// use effects
	// useEffect(() => {
	// 	console.log("userData", userData);
	// }, [userData]);

	useEffect(() => {
		if (input === "") {
			return;
		}

		if (input <= 0) {
			setWarningText("please enter value that is bigger than 0");
			setShowWarning(true);
		}

		if (input > userData.totalDeposits) {
			setWarningText(
				`you do not have sufficient funds, max you can withdraw is: ${calcAvailableBalance(
					userData.totalDeposits,
					userData.totalWithdrawals,
					userData.totalInvestments
				)}`
			);
			setShowWarning(true);
		}
	}, [
		input,
		userData.totalDeposits,
		userData.totalWithdrawals,
		userData.totalInvestments,
	]);

	useEffect(() => {
		if (showWarning === false) {
			return;
		}
		const timeOut = setTimeout(() => {
			setShowWarning(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [showWarning]);

	useEffect(() => {
		if (!tokenIsInvalid) {
			return;
		}
		const timeOut = setTimeout(() => {
			dispatch(tokenNotValid_LogoutUser_ClearAllSessionData());
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [tokenIsInvalid, dispatch]);

	useEffect(() => {
		if (!redirect) {
			return;
		}
		const timeOut = setTimeout(() => {
			navigate("/user-dashboard");
			dispatch(
				addToNotifications(
					`withdrew ${Number(input).toLocaleString("en-GB", {
						style: "currency",
						currency: "EUR",
					})}`
				)
			);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [redirect, navigate, input, dispatch]);

	// HTML

	if (tokenIsInvalid) {
		return (
			<h1 style={{ color: "red" }}>
				Your token is invalid you will be logged out and redirected to LOGIN
				PAGE
			</h1>
		);
	}

	if (redirect) {
		return (
			<RedirectPage
				redirectFromPageName="Withdraw"
				redirectToPageName="dashboard"
				text="Withdraw was successful you are being redirected"
			/>
		);
	}

	if (userData._id) {
		return (
			<div className="addPadding">
				<h1>Withdraw your available balance</h1>
				<h2>How much would you like to withdraw?</h2>
				<p>
					Enter an amount below and click 'Withdraw now' to send the money to
					your bank account now.
				</p>
				<hr />
				<h2>
					Available balance to withdraw:{" "}
					{userData._id &&
						calcAvailableBalance(
							userData.totalDeposits,
							userData.totalWithdrawals,
							userData.totalInvestments
						)}
				</h2>

				<p>Withdraw amount</p>
				<input
					type="number"
					min="0"
					max={calcAvailableBalance(
						userData.totalDeposits,
						userData.totalWithdrawals,
						userData.totalInvestments
					)}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="enter a number"
				/>
				{showWarning && <div className="warningText">{warningText}</div>}
				<br />
				<br />
				<button onClick={handleWithdrawal} disabled={redirect}>
					withdraw now
				</button>
				<br />
				<br />
				<button>
					<Link to="/user-dashboard">Dashboard</Link>
				</button>
			</div>
		);
	}
};

export default Withdraw;
