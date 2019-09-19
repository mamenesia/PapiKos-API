const conn = require("../config/db")
module.exports = {
  getRegion: param => {
    return new Promise((resolve, reject) => {
      const search = param.search
      console.log(param)
      let basicquery = `SELECT * FROM location where 1 `
      if (search != null) {
        basicquery += ` AND name like  '%${search}%'`
      }
      console.log("==" + basicquery)
      conn.query(basicquery, (err, rs) => {
        if (!err) {
          resolve(rs)
        } else {
          reject(err)
        }
      })
    })
  },
  getRegionById: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM location WHERE id_location =?`,
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
  addRegion: data => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO location SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editRegion: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE location set ? where id_location = ?`,
        [data, id],
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  deleteRegion: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `DELETE FROM location WHERE id_location = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  duplicateRegion: name => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM location where name = ?`, name, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  }
}
