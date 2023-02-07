import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowFooterMid = ({ children }) => {
	const location = useLocation();

	const [showFooterMid, setShowFooterMid] = useState(true);

	useEffect(() => {
		if (location.pathname === "/devpage") {
			setShowFooterMid(false);
		} else {
			setShowFooterMid(true);
		}
	}, [location]);

	return <div>{showFooterMid && children}</div>;
};

export default MaybeShowFooterMid;
