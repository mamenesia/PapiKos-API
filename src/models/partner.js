const conn = require('../config/db')

module.exports = {
	getPartners: param => {
		return new Promise((resolve, reject) => {
			const region = param.region
			const search = param.search
			let basicquery = `SELECT partner.id, partner.fullname, partner.labelName, partner.phone, partner.photo,partner.gender, partner.device_id,partner.images,partner.email,partner.password,partner.address,partner.latitude,partner.longitude,partner.id_location,location.name as region, location.loc_lattitude as region_lat, location.loc_longitude as region_long from partner INNER JOIN location ON partner.id_location= location.id_location where 1 `
			if (region != null) {
				basicquery += ` AND location.name = '${region}'`
			}
			if (search != null) {
				basicquery += ` AND fullname like  '%${search}%' or labelName like '%${search}%' or address like '%${search}%'`
			}
			conn.query(basicquery, (err, rs) => {
				if (!err) {
					resolve(rs)
				} else {
					reject(err)
				}
			})
		})
	},
	getAPartner: id => {
		return new Promise((resolve, reject) => {
			conn.query(
				'SELECT partner.id, partner.fullname, partner.labelName, partner.phone, partner.photo,partner.gender, partner.device_id,partner.images,partner.email,partner.password,partner.address,partner.latitude,partner.longitude,partner.id_location,location.name as region, location.loc_lattitude as region_lat, location.loc_longitude as region_long from partner INNER JOIN location ON partner.id_location= location.id_location where partner.id = ?',
				id,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
	updatePartner: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query(
				'UPDATE partner SET ? WHERE id = ?',
				[data, id],
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
	deletePartner: id => {
		return new Promise((resolve, reject) => {
			conn.query('DELETE FROM partner WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
//getAllpartners
// SELECT partner.id, partner.fullname, partner.labelName, partner.phone, partner.phone,partner.email,partner.password,partner.address,partner.latitude,partner.longitude,partner.id_location,location.name as region, location.loc_lattitude as region_lat, location.loc_longitude as region_long from partner INNER JOIN location ON partner.id_location= location.id_location
