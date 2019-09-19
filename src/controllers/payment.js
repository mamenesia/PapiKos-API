require('dotenv').config()
const modelPayment = require('../models/payment')

module.exports = {
	getPayments: (req, res) => {
		modelPayment
			.getPayments()
			.then(result => {
				res.send({
					status: 200,
					message: 'All Payments detail has successfully retrieved',
					result
				})
			})
			.catch(err => console.log(err))
	},
	getAPayment: (req, res) => {
		const id = req.params.id

		modelPayment
			.getAPayment(id)
			.then(result => {
				if (result[0] === undefined) {
					return res.status(400).send({
						status: 400,
						message: 'Payment data does not exist'
					})
				} else {
					return res.send({
						status: 200,
						id,
						message: 'Payment details has been successfully retrieved!',
						result
					})
				}
			})
			.catch(err => console.log(err))
	},
	createPayment: (req, res) => {
		const data = {
			bookid: req.body.bookid,
			amount: req.body.paid_amount,
			status: 'Pending',
			invoice_id: req.body.invoice_id,
			bank: req.body.bank_code,
			paymentDate: req.body.paymentDate,
			user_id: req.body.user_id
		}

		modelPayment
			.createPayment(data)
			.then(result => {
				res.send({
					status: 200,
					message: 'Payment has been added',
					payment: {
						bookid: req.body.bookid,
						amount: req.body.paid_amount,
						status: 'Pending',
						invoice_id: req.body.invoice_id,
						bank: req.body.bank_code,
						paymentDate: new Date(Date.now()),
						id_user: req.body.id_user
					}
				})
			})
			.catch(err => console.log(err))
	},
	updatePayment: (req, res) => {
		const id = req.params.id
		const data = {
			status: req.body.status
		}
		modelPayment
			.getAPayment(id)
			.then(result => {
				if (result.length !== 0) {
					return modelPayment.updatePayment(data, id).then(result => {
						res.send({
							status: 200,
							message: 'Payment has been updated',
							id,
							data
						})
					})
				} else {
					return res.status(400).send({
						status: 400,
						id,
						message: 'Payment detail does not exist'
					})
				}
			})
			.catch(err => console.log(err))
	},
	deletePayment: (req, res) => {
		const id = req.params.id
		modelPayment
			.getAPayment(id)
			.then(result => {
				if (result.length !== 0) {
					return modelPayment.deletePayment(id).then(result => {
						res.send({
							status: 200,
							id,
							message: 'Payment has been deleted'
						})
					})
				} else {
					return res.status(400).send({
						status: 400,
						id,
						message: 'Payment does not exist'
					})
				}
			})
			.catch(err => console.log(err))
	}
}
