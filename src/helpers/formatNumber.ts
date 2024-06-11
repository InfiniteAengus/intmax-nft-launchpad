export const formatNumber = (number: number) => {
	return Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 10,
	}).format(number);
};

export const formatLargeNumber = (
	number: number,
	fractionDigits: number = 2
) => {
	const units = ['K', 'M', 'B', 'T'];
	let unitIndex = 0;

	while (number >= 1000) {
		number /= 1000;
		unitIndex++;
	}

	if (unitIndex === 0) {
		return number;
	}

	return (
		(Number.isInteger(number)
			? number.toString()
			: number.toFixed(fractionDigits)) + units[unitIndex - 1]
	);
};
