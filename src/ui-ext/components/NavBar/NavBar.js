import React, { useEffect, useState } from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserLoggedOutNotificationToFalse } from "../../../redux/generalStore";
import moment from "moment";

// components
import FlenderLogo from "../FlenderLogo/FlenderLogo";

function NavBar() {
	// redux states
	const userLoggedInState = useSelector(
		(state) => state.generalStore.userLoggedInState
	);

	const userLoggedOutState = useSelector(
		(state) => state.generalStore.showUserLoggedOutNotification
	);

	const dispatch = useDispatch();

	// useEffects
	useEffect(() => {
		// console.log("navbar re-rendered");
	});

	useEffect(() => {
		if (userLoggedOutState === false) {
			return;
		}

		const timeOut = setTimeout(() => {
			dispatch(setUserLoggedOutNotificationToFalse());
		}, 3000);
		return () => clearTimeout(timeOut);
	}, [userLoggedOutState]);

	return (
		<div className="navBarContainer">
			<FlenderLogo />

			<div className="navBarContainer_items">
				<span className="navBarContainer_items_singleItem">Invest</span>
				<span className="navBarContainer_items_singleItem">Business Loan</span>
				<span className="navBarContainer_items_singleItem">
					<Link to="/marketplace">Marketplace</Link>
				</span>
				<span className="navBarContainer_items_singleItem">About</span>
				<span className="navBarContainer_items_singleItem">Contact</span>
			</div>

			<div className="navBarContainer_registerButtonContainer">
				{userLoggedInState ? (
					<>
						<button className="btn btn-secondary me-3">
							{" "}
							<Link to="/user-dashboard" className="registerButtonLink">
								Dashboard
							</Link>
						</button>
					</>
				) : (
					<>
						<button type="button" className="btn btn-secondary me-3">
							<Link to="/login" className="registerButtonLink">
								Log in
							</Link>
						</button>
						<button type="button" className="btn btn-primary">
							<Link to="/register" className="registerButtonLink">
								Register
							</Link>
						</button>
					</>
				)}
			</div>
			{userLoggedOutState && (
				<div className="navBarContainer_registerButtonContainer_LoggedOutNotification">
					<div>You have logged out</div>
					<div>{moment().calendar()}</div>
				</div>
			)}
		</div>
	);
}

export default NavBar;
