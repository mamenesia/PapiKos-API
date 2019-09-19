const conn = require("../config/db")
const nameColumns = ["name", "price"]
module.exports = {
  createRoom: data => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO room SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editRoom: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE room set ? where id = ?`, [data, id], (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteRoom: id => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM room WHERE id = ?`, id, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  getRoomById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select room.id,room.name,room.image,room.description, room.price, room.status , room.room_area, room_type.name as type, room_type.facilities, room.gender, partner.id as id_partner, partner.fullname as partner, partner.labelName, partner.phone, partner.address, partner.latitude, partner.longitude from room INNER JOIN partner on room.id_partner = partner.id INNER JOIN room_type on room_type_id = room_type.id WHERE room.id =?`,
        id,
        (err, rs) => {
          if (!err) {
            resolve(rs)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  getRoomAll: param => {
    return new Promise((resolve, reject) => {
      const sort = param.sorting
      const status = param.status
      const type = param.type
      const gender = param.gender
      const search = param.search

      console.log(param)
      let basicquery = `select room.id,room.name,room.image,room.description, room.price, room.status , room.room_area, room_type.name as type, room_type.facilities, room.gender, partner.id as id_partner, partner.fullname as partner,partner.labelName, partner.phone, partner.address, partner.latitude, partner.longitude from room INNER JOIN partner on room.id_partner = partner.id INNER JOIN room_type on room_type_id = room_type.id where 1 `
      if (status != null) {
        basicquery += ` AND status = '${status}'`
      }
      if (type != null) {
        basicquery += ` AND room_type.name = '${type}'`
      }
      if (gender != null) {
        basicquery += ` AND gender = '${gender}'`
      }
      if (search != null) {
        basicquery += ` AND room.name like  '%${search}%' or address like '%${search}%'`
      }
      if (sort != null) {
        let [col, order] = sort.split(":")
        if (order === undefined) {
          order = "asc"
        }
        if (!nameColumns.includes(col)) {
          resolve("Only can sort Name and Price")
          return
        }
        if (order !== "asc" && order !== "desc") {
          resolve("Invalid sort order")
          return
        }

        basicquery += ` ORDER BY ${col} ${order}`
      }
      basicquery += ` limit ${param.start},${param.limit}  `
      console.log("==" + basicquery)
      conn.query(basicquery, (err, rs) => {
        if (!err) {
          resolve(rs)
        } else {
          reject(err)
        }
      })
    })
  }
}
/*
Room Data
select room.id,room.name,room.image,room.description, room.price, room.status , room.room_area, room_type.name as type, room_type.facilities, room.gender, partner.id as id_partner, partner.fullname as partner, partner.phone, partner.address, partner.latitude, partner.longitude from room INNER JOIN partner on room.id_partner = partner.id INNER JOIN room_type on room_type_id = room_type.id
*/
