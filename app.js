require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverPOST = 3306;
const PORT = process.env.PORT || serverPOST;
//add cloudinary config
const { cloudinaryConfig } = require('./src/config/cloudinaryConfig');

const AuthRoute = require('./src/routes/auth');
const UserRoute = require('./src/routes/user');
const PartnerRoute = require('./src/routes/partner');

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
app.use('*', cloudinaryConfig);
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
// Route for Partner
app.use('/partner', PartnerRoute);
