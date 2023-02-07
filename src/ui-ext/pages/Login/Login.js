import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Login.css";
import { googleCaptchaSiteKey } from "../../../utils/captchaKeys";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { loginGetUser, checkToken } from "../../../utils/routes";
import FlenderLogo from "../../components/FlenderLogo/FlenderLogo";
import { useDispatch } from "react-redux";
import { addToNotifications } from "../../../redux/generalStore";
import moment from "moment";

const Login = () => {
	// variables and other
	const password1 = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// redux stuff

	// states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [captchaDone, setCaptchaDone] = useState(false);
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const [userNotFound, setUserNotFound] = useState(false);
	const [wrongPassword, setWrongPassword] = useState(false);

	// functions

	const captchaDoneFn = useCallback(() => {
		setCaptchaDone(true);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await axios.get(
			serverUrl + mainDB + loginGetUser + `?email=${email}&password=${password}`
		);

		if (res.data === "not found") {
			setUserNotFound(true);
			return;
		}

		if (res.data === "wrong password") {
			setWrongPassword(true);
			return;
		}

		// return user & add him to Session storage (for practice) AND to store
		// console.log(res.data);

		sessionStorage.setItem("yKPSZqVlAflkdns", JSON.stringify(res.data));

		// check if token is valid
		let tokenCheck = await axios(serverUrl + mainDB + checkToken, {
			headers: {
				Authorization: `Bearer ${res.data.token}`,
			},
		});

		if (tokenCheck.data === "token invalid, try again") {
			console.log("invalid token");
			return;
		}

		// redirect user to dashboard
		if (tokenCheck.data === "token is valid") {
			dispatch(addToNotifications("logged in"));
			navigate("/user-dashboard");
		}
	};

	const showPassword = (field) => {
		if (field.current.type === "password") {
			field.current.type = "text";
		} else {
			field.current.type = "password";
		}
	};

	// useEffect

	useEffect(() => {
		if (password === "" || email === "" || !captchaDone) {
			return;
		}

		setSubmitDisabled(false);
	}, [email, password, captchaDone]);

	useEffect(() => {
		if (!userNotFound) {
			return;
		}

		let timeOut = setTimeout(() => {
			setUserNotFound(false);
		}, 3000);

		return () => clearTimeout(timeOut);
	}, [userNotFound]);

	useEffect(() => {
		if (!wrongPassword) {
			return;
		}

		let timeOut = setTimeout(() => {
			setWrongPassword(false);
		}, 3000);

		return () => clearTimeout(timeOut);
	}, [wrongPassword]);

	return (
		<div className="addPadding">
			<FlenderLogo />
			<h3>sign into your account</h3>

			<form onSubmit={handleSubmit}>
				<div className="RegisterContainer_input_element">
					<label>Email</label>
					<br />
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{userNotFound && (
						<div className="warningText">user not found, try again</div>
					)}
				</div>

				<div className="RegisterContainer_input_element">
					<label>Password</label>
					<br />
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						ref={password1}
					/>
					<button onClick={() => showPassword(password1)}>show</button>
					<span className="Login_ForgotPasswordText">
						<Link to="/forgot-password">Forgot password?</Link>
					</span>
					{wrongPassword && (
						<div className="warningText">wrong password, try again</div>
					)}
				</div>

				<div className="RegisterContainer_input_element">
					<ReCAPTCHA sitekey={googleCaptchaSiteKey} onChange={captchaDoneFn} />
				</div>

				<div className="RegisterContainer_input_element">
					<button className="Login_backButton">
						<Link to="/">back</Link>
					</button>
					<button type="submit" disabled={submitDisabled}>
						Log In
					</button>
				</div>

				<div className="RegisterContainer_input_element">
					<Link to="/register">Sign up for an account Sign Up</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
