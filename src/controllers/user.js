require("dotenv").config()
const modelUser = require("../models/user")
const { uploadImage, deleteImage } = require("../middleware/uploadImage")

module.exports = {
  getUsers: (req, res) => {
    modelUser
      .getUsers()
      .then(result => {
        res.send({
          status: 200,
          message: "All Users are successfully fetched!",
          data: result
        })
      })
      .catch(err => console.log(err))
  },
  getAUser: (req, res) => {
    const id = req.params.id
    modelUser
      .getAUser(id)
      .then(result => {
        if (result[0] === undefined) {
          return res.status(400).send({
            status: 400,
            message: "The user doesn't exist"
          })
        } else {
          return res.send({
            status: 200,
            message: "The user data is successfully retrieved",
            data: result
          })
        }
      })
      .catch(err => console.log(err))
  },
  updateUser: (req, res) => {
    const id = req.params.id
    const data = { ...req.body }

    modelUser.getAUser(id).then(async result => {
      if (result.length !== 0) {
        if (req.files.length > 0) {
          data.photo = `${await uploadImage(req)}`
        }
        return modelUser
          .updateUser(data, id)
          .then(result => {
            modelUser.getAUser(id).then(newData => {
              res.json({
                status: 200,
                message: `User ${id} has been updated`,
                data: newData
              })
            })
          })
          .catch(err => {
            res.status(500).json({
              status: 500,
              message: err.message || "same error"
            })
          })
      } else {
        return res.status(400).send({
          status: 400,
          id,
          message: "User does not exist"
        })
      }
    })
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    modelUser
      .getAUser(id)
      .then(result => {
        if (result.length > 0) {
          return modelUser
            .deleteUser(id)
            .then(result => {
              res.send({
                status: 200,
                id,
                message: "User has been deleted"
              })
            })
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: "User does not exist"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message || "same error"
        })
      })
  }
}
