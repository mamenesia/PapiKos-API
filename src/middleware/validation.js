// Validation
const Joi = require('@hapi/joi');

const registerValidation = data => {
	const schema = {
		username: Joi.string()
			.min(6)
			.max(16)
			.required(),
		email: Joi.string()
			.min(6)
			.required()
			.email(),
		password: Joi.string()
			.min(8)
			.max(16)
			.required()
	};
	return Joi.validate(data, schema);
};

const loginValidation = data => {
	const schema = {
		username: Joi.string()
			.min(6)
			.max(16)
			.required(),
		password: Joi.string()
			.min(8)
			.max(16)
			.required()
	};
	return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
