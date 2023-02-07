import "./Register.css";
import React, { useEffect, useState, useRef } from "react";
import { areaCodes } from "../../../utils/areaCodes";
import axios from "axios";
import { serverUrl, mainDB } from "../../../utils/serverUrls";
import { registerAddUser } from "../../../utils/routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha";
import { googleCaptchaSiteKey } from "../../../utils/captchaKeys";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import RedirectPage from "../RedirectPage/RedirectPage";

const Register = () => {
	// variables
	const navigate = useNavigate();

	// states
	const [fName, setFName] = useState("");
	const [sName, setSName] = useState("");
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [telArea, setTelArea] = useState("select");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
	const [signUpDisabled, setSignUpDisabled] = useState(true);
	const [userExists, setUserExists] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState(false);
	const [captchaDone, setCaptchaDone] = useState(false);

	// useRefs
	const password1 = useRef();
	const passwordConfirm1 = useRef();

	// FUNCTIONS

	const showPassword = (field) => {
		if (field.current.type === "password") {
			field.current.type = "text";
		} else {
			field.current.type = "password";
		}
	};

	// const resetStates = () => {
	//     setFName('');
	//     setSName('');
	//     setEmail('');
	//     setTel('');
	//     setTelArea('select');
	//     setPassword('');
	//     setPasswordConfirm('');
	//     setDoPasswordsMatch(true);
	//     setSignUpDisabled(true);
	// }

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// send user details
			let req = await axios.post(serverUrl + mainDB + registerAddUser, {
				fName,
				sName,
				email,
				tel,
				telArea,
				password,
			});
			console.log(req.data);

			// check if user exists
			if (req.data === "user already exists") {
				setUserExists(true);
				return;
			}

			// check to make sure user has info in it
			if (!req.data._id) {
				console.log("empty object returned from server");
			}

			setRegisterSuccess(true);
		} catch (error) {
			console.log(error);
		}

		// end of handle submit
	};

	// useEffect

	useEffect(() => {
		if (passwordConfirm !== password) {
			setDoPasswordsMatch(false);
			setSignUpDisabled(true);
			return;
		}

		if (password === "" && passwordConfirm === "") {
			setSignUpDisabled(true);
			return;
		}

		if (!captchaDone) {
			setSignUpDisabled(true);
			return;
		}

		setDoPasswordsMatch(true);
		setSignUpDisabled(false);
	}, [passwordConfirm, captchaDone]);

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setUserExists(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [userExists]);

	useEffect(() => {
		if (!registerSuccess) {
			return;
		}

		console.log("redirecting now");
		let timeOut = setTimeout(() => {
			navigate("/");
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [registerSuccess]);

	if (registerSuccess) {
		return (
			<RedirectPage
				redirectFromPageName="Registration"
				text="You have registered successfully"
				redirectToPageName="home"
			/>
		);
	}

	return (
		<div className="RegisterContainer">
			<Helmet>
				<title>Registration page</title>
			</Helmet>
			<h1>Join today and start investing in minutes.</h1>

			<form onSubmit={handleSubmit}>
				{/* First name */}

				<div className="RegisterContainer_input_element">
					<label>First Name</label>
					<br />
					<input
						type="text"
						value={fName}
						onChange={(e) => setFName(e.target.value)}
					/>
				</div>

				{/* Second Name */}
				<div className="RegisterContainer_input_element">
					<label>Second Name</label>
					<br />
					<input
						type="text"
						value={sName}
						onChange={(e) => setSName(e.target.value)}
					/>
				</div>

				{/* Email */}
				<div className="RegisterContainer_input_element">
					<label>Email</label>
					<br />
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				{/* telephone */}
				<div className="RegisterContainer_input_element">
					<label>Mobile number</label>
					<br />
					<select value={telArea} onChange={(e) => setTelArea(e.target.value)}>
						{areaCodes &&
							areaCodes.map((el) => {
								return (
									<option value={el} key={el}>
										{el}
									</option>
								);
							})}
					</select>

					<input
						type="tel"
						value={tel}
						onChange={(e) => setTel(e.target.value)}
					/>
				</div>

				{/* password */}
				<div className="RegisterContainer_input_element">
					<label>Password</label>
					<br />
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						ref={password1}
					/>

					<button type="button" onClick={() => showPassword(password1)}>
						show
					</button>
					<div style={{ width: "300px" }}>
						<PasswordStrengthBar
							password={password}
							shortScoreWord="please enter password"
						/>
					</div>
				</div>

				{/* confirm password */}
				<div className="RegisterContainer_input_element">
					<label>Password</label>
					<br />
					<input
						type="password"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
						ref={passwordConfirm1}
					/>
					<button type="button" onClick={() => showPassword(passwordConfirm1)}>
						show
					</button>
					{!doPasswordsMatch && (
						<span
							style={{
								color: "red",
								border: "1px solid red",
								marginLeft: "20px",
								padding: "10px",
							}}
						>
							passwords do NOT match
						</span>
					)}
				</div>

				<div className="RegisterContainer_input_element">
					<ReCAPTCHA
						sitekey={googleCaptchaSiteKey}
						onChange={() => setCaptchaDone(true)}
					/>
				</div>

				<div className="RegisterContainer_input_element">
					<button type="submit" disabled={signUpDisabled}>
						Sign Up
					</button>
					<br />
					{userExists && (
						<div className="RegisterContainer_warningMessage">
							User already exists
						</div>
					)}
				</div>

				{/* end of form */}
			</form>

			<div className="RegisterContainer_input_smallPrint">
				By clicking this, you agree to the Terms of Use and Privacy of our
				website.
			</div>

			<div className="RegisterContainer_input_loginLink">
				<Link to="/login">Already Have an account? Sign in</Link>
			</div>
		</div>
	);
};

export default Register;
