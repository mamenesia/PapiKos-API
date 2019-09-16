require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers['Authorization'];
	if (!token) return res.sendStatus(401);

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.send({
			status: 400,
			message: 'Invalid Token'
		});
	}
};
