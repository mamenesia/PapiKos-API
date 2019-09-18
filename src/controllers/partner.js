require("dotenv").config()
const modelPartner = require("../models/partner")

module.exports = {
	getPartners: (req, res) => {
		modelPartner
			.getPartners()
			.then(result => {
				res.send({
					status: 200,
					message: 'All Partners are successfully fetched!',
					result
				});
			})
			.catch(err => console.log(err));
	},
	getAPartner: (req, res) => {
		const id = req.params.id;
		modelPartner
			.getAPartner(id)
			.then(result => {
				if (result[0] === undefined) {
					return res
						.status(400)
						.send({ status: 400, message: 'The Partner does not exist' });
				} else {
					return res.send({
						status: 200,
						id,
						message: 'The Partner data is successfully retrieved',
						result
					});
				}
			})
			.catch(err => console.log(err));
	},
	updatePartner: (req, res) => {
		const id = req.params.id;
		const data = {
			fullname: req.body.fullname,
			labelName: req.body.labelName,
			phone: req.body.phone,
			email: req.body.email,
			photo: req.body.photo,
			address: req.body.address,
			id_location: req.body.id_location
		};

    modelPartner.getAPartner(id).then(result => {
      if (result.length !== 0) {
        return modelPartner
          .updatePartner(data, id)
          .then(result => {
            res.send({
              status: 200,
              message: "Partner data has been successfully updated",
              id,
              data
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
    modelPartner.getAPartner(id).then(result => {
      if (result.length !== 0) {
        return modelPartner.deletePartner(id).then(result => {
          res.send({
            status: 200,
            id,
            message: "Partner has been deleted"
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
  }
}
