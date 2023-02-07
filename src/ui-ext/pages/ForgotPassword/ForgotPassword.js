import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// global variables
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { resetPassword } from "../../../utils/routes";

// components
import RedirectPage from "../RedirectPage/RedirectPage";

const ForgotPassword = () => {
	// variables
	const navigate = useNavigate();

	// states
	const [email, setEmail] = useState("");
	const [notFound, setNotFound] = useState(false);
	const [userFoundSoRedirect, setUserFoundSoRedirect] = useState(false);
	const [loading, setLoading] = useState(false);

	// functions

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		// email not found
		let res = await axios.post(serverUrl + mainDB + resetPassword, {
			email: email,
		});
		console.log(res.data);

		if (res.data === "user not found") {
			setNotFound(true);
			setLoading(false);
			return;
		}

		// user found so redirect
		setUserFoundSoRedirect(true);
	};

	// useEffect
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setNotFound(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [notFound]);

	useEffect(() => {
		if (!userFoundSoRedirect) {
			return;
		}

		const timeOut = setTimeout(() => {
			navigate("/");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [userFoundSoRedirect, navigate]);

	if (userFoundSoRedirect) {
		return (
			<RedirectPage
				redirectFromPageName={"Password reset"}
				text={"Check your email, we have sent you a reset link"}
			/>
		);
	}

	return (
		<div className="addPadding">
			<h1>Flender Logo</h1>
			<p>Enter your email and we will email you a link to reset password</p>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter email here"
			/>
			<button onClick={handleSubmit}>{loading ? "Loading..." : "send"}</button>
			{notFound && <div className="warningText">email does not exist</div>}
		</div>
	);
};

export default ForgotPassword;
