import axios from "axios";
import { serverUrl, mainDB } from "../utils/serverUrls";
import { checkToken } from "../utils/routes";

async function checkUserToken(token) {
	//
	// token = "sdjflsdjl";
	const res = await axios.get(serverUrl + mainDB + checkToken, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	// console.log(res.data);

	if (res.data === "token invalid, try again") {
		return false;
	}

	if (res.data === "token is valid") {
		return true;
	}
}

export default checkUserToken;
