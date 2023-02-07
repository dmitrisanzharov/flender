import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";
import calcAvailableBalance from "../../../helper/calAvailableBalance";

// redux
import { useSelector, useDispatch } from "react-redux";
import { checkIfUserIsLoggedIn } from "../../../redux/generalStore";

const UserDashboard = () => {
	// states

	// redux
	let userLoggedInState = useSelector(
		(state) => state.generalStore.userLoggedInState
	);
	let userData = useSelector((state) => state.generalStore.userData);
	const dispatch = useDispatch();

	// useEffects

	useEffect(() => {
		// console.log("userLoginState", userLoggedInState);
		// console.log("userData", userData);
		dispatch(checkIfUserIsLoggedIn());
	}, [userLoggedInState]);

	useEffect(() => {
		// console.log(userData);
		// console.log(typeof userData.totalWithdrawals);
	}, []);

	// HTML

	if (!userLoggedInState) {
		return (
			<div className="addPadding">
				<h1>You are not logged in, please login to continue</h1>
				<h2>
					<Link to="/login">Link to login page</Link>
				</h2>
			</div>
		);
	}

	if (userData._id) {
		const {
			fName,
			sName,
			flenderId,
			totalDeposits,
			totalWithdrawals,
			totalInvestments,
		} = userData;

		return (
			<div className="addPadding">
				<hr />
				<div>Welcome back to Flender!</div>
				<div>
					{fName} {sName}
				</div>
				<div>
					Here is your unique reference when making credit transfers:{" "}
					<b>{flenderId}</b>
				</div>
				<hr />
				<ul>
					<li>
						<Link to="/add-funds">Add funds</Link>
					</li>
					<li>
						<Link to="/withdraw">Withdraw</Link>
					</li>
				</ul>
				<hr />
				<h5>My Account</h5>
				<ul>
					<li>
						Total deposits:{" "}
						{totalDeposits.toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}
					</li>
					<li>
						Total withdrawals:{" "}
						{totalWithdrawals.toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}{" "}
						<span>
							- there are NO withdrawals on this project, it simply minuses the
							totalDeposits
						</span>
					</li>
					<li>
						Available balance:{" "}
						{calcAvailableBalance(
							totalDeposits,
							totalWithdrawals,
							totalInvestments
						)}
					</li>
				</ul>
				<button>
					<Link to="/add-funds">add funds</Link>
				</button>{" "}
				<br /> <br />
				<button>
					<Link to="/transactions">View Transaction Reports</Link>
				</button>{" "}
				<hr />
				<h5>My Investments</h5>
				<ul>
					<li>
						Total investments:{" "}
						{totalInvestments.toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}
					</li>
				</ul>
				<button>
					<Link to="/marketplace">See Marketplace</Link>
				</button>{" "}
				<br /> <br />
				{/* end of the component */}
			</div>
		);
	}
};

export default UserDashboard;
