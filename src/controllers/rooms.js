const modelRooms = require("../models/rooms")

module.exports = {
  create: (req, res) => {
    let photos
    const { name, description, price, id_partner, room_area } = req.body
    if (req.file) {
      console.log(req.body)
    } else {
      console.log(req.body.name)
      console.log("cannot be null")
    }
  }
}
