import { secretNameOfSession } from "../utils/allOther";

function checkIfLoggedIn() {
	let data = sessionStorage.getItem(secretNameOfSession);
	console.log("data from session storage: ", data);

	if (!data) {
		return false;
	}

	return true;
}

export default checkIfLoggedIn;
