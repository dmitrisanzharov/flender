function calcAvailableBalance(deposits, withdrawal, investments) {
	// console.log("deposits are", typeof deposits);
	// console.log("withdrawal are", typeof withdrawal);
	// console.log("investments are", typeof investments);

	let final = deposits - withdrawal - investments;
	return final.toLocaleString("en-GB", {
		style: "currency",
		currency: "EUR",
	});
}

export default calcAvailableBalance;
