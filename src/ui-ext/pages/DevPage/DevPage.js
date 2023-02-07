import React, { useEffect, useState } from "react";
import "./DevPage.css";

const DevPage = () => {
	let data = sessionStorage.getItem("key1");

	function addToDataNew() {
		sessionStorage.setItem("key1", JSON.stringify({ name: "Dmitri" }));
	}

	useEffect(() => {
		console.log("triggered useEffect");

		if (!data) {
			console.log("nothing in data");
			return;
		}
	}, [data]);

	return (
		<div className="DevPageContainer addPadding drr">
			<div className="InnerDivTest dgg">
				<button onClick={addToDataNew}>add new</button>
			</div>
		</div>
	);
};

export default DevPage;
