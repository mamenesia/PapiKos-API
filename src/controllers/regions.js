const modelRegions = require("../models/regions")

module.exports = {
  getRegions: (req, res) => {
    const paramUrl = {
      search: req.query.search
    }
    modelRegions
      .getRegion(paramUrl)
      .then(result => {
        res.send({
          status: 200,
          message: "All Regions are successfully fetched!",
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
  getARegions: (req, res) => {
    const id = req.params.id
    modelRegions
      .getRegionById(id)
      .then(result => {
        if (result[0] === undefined) {
          return res.status(400).send({
            status: 400,
            message: "The Regions doesn't exist"
          })
        } else {
          return res.send({
            status: 200,
            message: "The Regions data is successfully retrieved",
            data: result
          })
        }
      })
      .catch(err => console.log(err))
  },
  addRegions: (req, res) => {
    const data = { ...req.body }
    modelRegions.duplicateRegion(req.body.name).then(result => {
      if (result.length === 0) {
        return modelRegions
          .addRegion(data)
          .then(result => {
            data.id = result.insertId
            res.send({
              status: 200,
              message: "Regions successfully registered!",
              data: data
            })
          })
          .catch(err => console.log(err))
      } else {
        return res.status(400).send({
          status: 400,
          message: "Regions already registered!"
        })
      }
    })
  },
  updateRegions: (req, res) => {
    const id = req.params.id
    const data = { ...req.body }

    modelRegions.getRegionById(id).then(result => {
      if (result.length > 0) {
        return modelRegions
          .editRegion(data, id)
          .then(result => {
            modelRegions.getRegionById(id).then(newData => {
              res.json({
                status: 200,
                message: `Region ${id} has been updated`,
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
          message: "Regions does not exist"
        })
      }
    })
  },
  deleteRegions: (req, res) => {
    const id = req.params.id
    modelRegions
      .getRegionById(id)
      .then(result => {
        if (result.length > 0) {
          return modelRegions
            .deleteRegion(id)
            .then(result => {
              res.send({
                status: 200,
                id,
                message: "Regions has been deleted"
              })
            })
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: "Regions does not exist"
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
