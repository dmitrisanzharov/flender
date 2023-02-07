import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowNavBar = ({ children }) => {
	const location = useLocation();

	const [showNavBar, setShowNavBar] = useState(false);

	useEffect(() => {
		if (
			location.pathname === "/login" ||
			location.pathname === "/forgot-password" ||
			location.pathname === "/user-dashboard" ||
			location.pathname === "/devpage" ||
			location.pathname === "/add-funds" ||
			location.pathname === "/withdraw" ||
			location.pathname === "/credit-card-page"
		) {
			setShowNavBar(false);
		} else {
			setShowNavBar(true);
		}
	}, [location]);

	return <div>{showNavBar && children}</div>;
};

export default MaybeShowNavBar;
