const symbols = [
	"~",
	"?",
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	">",
	"<",
	"&",
	"*",
	"(",
	")",
	"_",
	"-",
	"+",
	"=",
];
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const specialCharacters = [...symbols, ...nums];

export const validatePassword = (password) => {
	if (password.length < 8) {
		return {
			isValid: false,
			msg: "Your password must be at least 8 characters, c'mon now",
		};
	} else if (!passwordHasSpecialCharacter(password)) {
		return {
			isValid: false,
			msg: `Your password must contain at least one number or symbol (e.g. ${symbols.join(
				", "
			)})`,
		};
	}
	return { isValid: true, msg: "" };
};

const passwordHasSpecialCharacter = (password) => {
	return (
		password
			.split("")
			.filter((pass) => specialCharacters.indexOf(pass) !== -1).length > 0
	);
};
