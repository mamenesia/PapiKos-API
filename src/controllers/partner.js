const modelPartner = require("../models/partner")
const { uploadImage, deleteImage } = require("../middleware/uploadImage")

module.exports = {
  getPartners: (req, res) => {
    const paramUrl = {
      region: req.query.region,
      search: req.query.search
    }
    modelPartner
      .getPartners(paramUrl)
      .then(result => {
        res.send({
          status: 200,
          message: "All Partners are successfully fetched!",
          data: result
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message || "same error"
        })
      })
  },
  getAPartner: (req, res) => {
    const id = req.params.id
    modelPartner
      .getAPartner(id)
      .then(result => {
        if (result[0] === undefined) {
          return res
            .status(400)
            .send({ status: 400, message: "The Partner does not exist" })
        } else {
          return res.send({
            status: 200,
            message: "The Partner data is successfully retrieved",
            data: result
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message || "same error"
        })
      })
  },
  updatePartner: (req, res) => {
    const id = req.params.id
    const data = { ...req.body }
    modelPartner.getAPartner(id).then(async result => {
      if (result.length > 0) {
        if (req.files.length > 0) {
          data.photo = `${await uploadImage(req)}`
        }
        return modelPartner
          .updatePartner(data, id)
          .then(result => {
            modelPartner.getAPartner(id).then(newData => {
              res.json({
                status: 200,
                message: `partner ${id} has been updated`,
                data: newData
              })
            })
          })
          .catch(err => console.log(err))
      } else {
        return res.status(400).send({
          status: 400,
          id,
          message: "Partner does not exist"
        })
      }
    })
  },
  deletePartner: (req, res) => {
    const id = req.params.id
    modelPartner
      .getAPartner(id)
      .then(result => {
        if (result.length > 0) {
          return modelPartner.deletePartner(id).then(result => {
            res.send({
              status: 200,
              id,
              message: `Partner ${id} has been deleted`
            })
          })
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: "Partner does not exist"
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
