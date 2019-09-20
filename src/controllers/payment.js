require('dotenv').config()
const modelPayment = require('../models/payment')
const axios = require('axios')
const token =
	'Basic eG5kX2RldmVsb3BtZW50X3l0MEJIYm0xM2V1UmEzSmRSenc3RVI5aVZ0aUxGZG85Mkw1MVBONUtxVmxlWG5zU3dvZVVKY2tjaW9lT1M6'
module.exports = {
	getPayments: (req, res) => {
		modelPayment
			.getPayments()
			.then(result => {
				res.json({
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
					return res.status(400).json({
						status: 400,
						message: 'Payment data does not exist'
					})
				} else {
					var invoice = result[0].invoice_id

					axios
						.get(`https://api.xendit.co/v2/invoices/${invoice}`, {
							headers: { Authorization: token }
						})
						.then(datas => {
							res.json({
								status: 200,
								id,
								message: 'Payment details has been successfully retrieved!',
								result: result,
								xendit: datas.data
							})
							console.log(datas.data)
						})
				}
			})
			.catch(err => console.log(err))
	},
	createPayment: async (req, res) => {
		const DataInvoice = {
			external_id: req.body.bookid,
			payer_email: req.body.email,
			description: 'generate lah descriptionnya, dapat duit aku',
			amount: req.body.paid_amount
		}
		await axios
			.post('https://api.xendit.co/v2/invoices', DataInvoice, {
				headers: { Authorization: token }
			})
			.then(result => {
				const data = {
					bookid: req.body.bookid,
					amount: req.body.paid_amount,
					status: 'Pending',
					invoice_id: result.data.id,
					bank: req.body.bank_code,
					paymentDate: new Date(),
					id_user: req.body.id_user
				}

				modelPayment
					.createPayment(data)
					.then(data => {
						var xendit = result.data
						res.send({
							status: 200,
							message: 'Payment has been added',
							payment: {
								bookid: req.body.bookid,
								amount: req.body.paid_amount,
								status: 'Pending',
								invoice_id: result.data.id,
								bank: req.body.bank_code,
								paymentDate: new Date(Date.now()),
								id_user: req.body.id_user
							},
							xendit,
							data
						})
					})
					.catch(err => console.log(err))
			})
			.catch(err => {
				res.status(403).json(err)
			})
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
	},
	paid: (req, res) => {
		const data = {
			bookid: req.body.external_id,
			status: req.body.status,
			bank: req.body.bank_code,
			amount: req.body.paid_amount
		}
		modelPayment.paid(data, req.body.external_id).then((result, err) => {
			res.json({ result })
		})
	}
}
