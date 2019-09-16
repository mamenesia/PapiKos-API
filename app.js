require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverPOST = 3030;
const PORT = process.env.PORT || serverPOST;

const AuthRoute = require('./src/routes/auth');
const UserRoute = require('./src/routes/user');

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

// Route for Auth
app.use('/', AuthRoute);

// Rouute for User
app.use('/user', UserRoute);
