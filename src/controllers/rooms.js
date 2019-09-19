const modelRooms = require('../models/rooms')
const { uploadImage, deleteImage } = require('../middleware/uploadImage')

module.exports = {
	getRoomById: (req, res) => {
		const id = req.params.id
		modelRooms
			.getRoomById(id)
			.then(rs => {
				res.json({
					status: 200,
					message: 'Success',
					data: rs
				})
			})
			.catch(err => {
				res.status(500).json({
					status: 500,
					message: err.message || 'same error'
				})
			})
	},
	create: async (req, res) => {
		let image
		const {
			name,
			description,
			price,
			id_partner,
			room_area,
			room_type_id,
			status
		} = req.body
		if (
			name == null ||
			description == null ||
			price == null ||
			id_partner == null ||
			room_area == null ||
			room_type_id == null ||
			status == null
		) {
			return res.status(400).json({
				status: 400,
				message: 'field cannot be empty'
			})
		}
		if (req.files.length > 0) {
			image = `${await uploadImage(req)}`
		} else {
			image = [
				'https://res.cloudinary.com/zerefweismann/image/upload/v1568738285/papikos/hl69beci8dfujyjhuukd.jpg'
			]
		}
		const data = {
			name,
			description,
			price,
			id_partner,
			room_area,
			image,
			room_type_id,
			status
		}
		// console.log(data)
		// let a = facilities.split(",")
		// for (let i = 0; i < a.length; i++) {
		//   console.log(a[i])
		// }
		modelRooms
			.createRoom(data)
			.then(rs => {
				data.id = rs.insertId
				modelRooms.getRoomById(data.id).then(newData => {
					res.json({
						status: 200,
						message: 'data successfully saved',
						data: newData
					})
				})
			})
			.catch(err => {
				res.status(500).json({
					status: 500,
					message: err.message || 'same error'
				})
			})
	},
	edit: (req, res) => {
		const id = req.params.id
		const data = { ...req.body }
		modelRooms
			.getRoomById(id)
			.then(async rs => {
				if (rs.length > 0) {
					if (req.files.length > 0) {
						image = `${await uploadImage(req)}`
					}
					return modelRooms
						.editRoom(data, id)
						.then(rs => {
							data.id = id
							modelRooms.getRoomById(data.id).then(newData => {
								res.json({
									status: 200,
									message: `room ${id} has been updated`,
									data: newData
								})
							})
						})
						.catch(err => {
							res.status(500).json({
								status: 500,
								message: err.message || 'same error'
							})
						})
				} else {
					return res.status(409).json({
						status: 409,
						message: `Id Invalid id ${id}`
					})
				}
			})
			.catch(err => {
				res.status(500).json({
					status: 500,
					message: err.message || 'same error'
				})
			})
	},
	delete: (req, res) => {
		const id = req.params.id
		modelRooms
			.getRoomById(id)
			.then(rs => {
				if (rs.length > 0) {
					return modelRooms.deleteRoom(id).then(rs => {
						res.json({
							status: 200,
							message: `room ${id} has been deleted`,
							id
						})
					})
				} else {
					return res.status(409).json({
						status: 409,
						message: `Id Invalid id ${id}`
					})
				}
			})
			.catch(err => {
				res.status(500).json({
					status: 500,
					message: err.message || 'same error'
				})
			})
	},
	getAllRoom: (req, res) => {
		const paramUrl = {
			sorting: req.query.sort,
			status: req.query.status,
			type: req.query.type,
			gender: req.query.gender,
			search: req.query.search
		}
		const limit = parseInt(req.query.limit, 10) || 15
		const page = parseInt(req.query.page, 10) || 1
		const start = (page - 1) * limit

		paramUrl.limit = limit
		paramUrl.start = start

		modelRooms
			.getRoomAll(paramUrl)
			.then(rs => {
				res.json({
					status: 200,
					message: 'Sukses',
					data: rs
				})
			})
			.catch(err => {
				res.status(500).json({
					status: 500,
					message: err.message || 'same error'
				})
			})
	}
}
