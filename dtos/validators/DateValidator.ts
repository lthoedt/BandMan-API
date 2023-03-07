import Validator from "./Validator";
export default class DateValidator extends Validator {
	validationFunctions = [
		(value: string) => {
			// First check for the pattern
			if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(value))
				return "Not correct format, correct date format is ISO 8601: yyyy-mm-dd.";

			// Parse the date parts to integers
			const parts = value.split("-");
			const year = parseInt(parts[0], 10);
			const month = parseInt(parts[1], 10);
			const day = parseInt(parts[2], 10);

			// Check the ranges of month and year
			if (year < 1000 || year > 3000)
				return "Not a valid date, correct year interval [1000, 3000]";

			if (month == 0 || month > 12)
				return "Not a valid date, correct months range is [1, 12]";

			const monthLength = [
				31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
			];

			// Adjust for leap years
			if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
				monthLength[1] = 29;

			const daysInMonth = monthLength[month - 1];

			// Check the range of the day
			if (day < 0 || day > daysInMonth)
				return `Not a valid date, correct day range for month ${month}, is [1, ${daysInMonth}]`;
		},
	];
}
