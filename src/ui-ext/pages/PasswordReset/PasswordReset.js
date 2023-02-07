import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { resetPasswordFinal } from "../../../utils/routes";
import RedirectPage from "../RedirectPage/RedirectPage";

const PasswordReset = () => {
	// variables and other
	const { token } = useParams();
	const password1Ref = useRef();
	const passwordConfirm1Ref = useRef();
	const navigate = useNavigate();

	// states
	const [state, setState] = useState({
		password1: "",
		password2: "",
		passwordsNoMatch: false,
		passwordResetSuccess: false,
		loading: false,
	});

	const {
		password1,
		password2,
		passwordsNoMatch,
		passwordResetSuccess,
		loading,
	} = state;

	// functions
	const showPassword = (field) => {
		if (field.current.type === "password") {
			field.current.type = "text";
		} else {
			field.current.type = "password";
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setState((p) => ({ ...p, loading: true }));

		// check if passwords match
		if (password1 !== password2) {
			setState((p) => ({ ...p, passwordsNoMatch: true, loading: false }));
			return;
		}

		// send password and token to server
		let res = await axios.post(serverUrl + mainDB + resetPasswordFinal, {
			token: token,
			password: password1,
		});
		console.log("this is user data", res.data);

		// return the user from server, put the user into sessionStorage
		sessionStorage.setItem("yKPSZqVlAflkdns", JSON.stringify(res.data));

		// set password resetSuccess so I can redirect back to
		setState((p) => ({ ...state, passwordResetSuccess: true, loading: false }));
	};

	// useEffect

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setState((p) => ({ ...p, passwordsNoMatch: false }));
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [passwordsNoMatch]);

	useEffect(() => {
		if (!passwordResetSuccess) {
			return;
		}

		let timeOut = setTimeout(() => {
			navigate("/user-dashboard");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [passwordResetSuccess, navigate]);

	if (passwordResetSuccess) {
		return (
			<RedirectPage
				redirectFromPageName="Password reset"
				redirectToPageName="User dashboard"
				text="Password reset was a success!"
			/>
		);
	}
	return (
		<div className="addPadding">
			<Helmet>
				<title>Password reset page</title>
			</Helmet>
			<h1>Flenders logo</h1>
			<hr />
			<label>enter password</label>
			<br />
			<input
				type="password"
				value={password1}
				onChange={(e) => setState((p) => ({ ...p, password1: e.target.value }))}
				ref={password1Ref}
				placeholder="enter password"
			/>
			<button type="button" onClick={() => showPassword(password1Ref)}>
				show
			</button>
			<hr />
			<label>confirm password</label>
			<br />
			<input
				type="password"
				value={password2}
				onChange={(e) => setState((p) => ({ ...p, password2: e.target.value }))}
				ref={passwordConfirm1Ref}
				placeholder="confirm password"
			/>
			<button type="button" onClick={() => showPassword(passwordConfirm1Ref)}>
				show
			</button>
			<hr />
			<button onClick={handleSubmit}>
				{loading ? "loading..." : "submit"}
			</button>
			{passwordsNoMatch && (
				<div className="warningText">
					passwords did not match, please try again
				</div>
			)}
		</div>
	);
};

export default PasswordReset;
