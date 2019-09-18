const express = require('express')
const cors = require('cors')
const app = express()
const Route = express.Router()
const verify = require('../middleware/verifyToken')
const PaymentController = require('../controllers/payment')

app.use(cors())
Route.get('/', PaymentController.getPayments)
	.get('/:id', PaymentController.getAPayment)
	.post('/', PaymentController.createPayment)
	.patch('/:id', PaymentController.updatePayment)
	.delete('/:id', PaymentController.deletePayment)

module.exports = Route
