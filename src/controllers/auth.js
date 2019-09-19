require("dotenv").config()

const modelAuth = require("../models/auth")
const modelPartner = require("../models/partner")
const modelUser = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

module.exports = {
  registerUser: (req, res) => {
    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // if register data valid, proceed to insert user data to db
    const data = {
      fullname: req.body.fullname,
      username: req.body.username,
      photo:
        "https://res.cloudinary.com/zerefweismann/image/upload/v1568823411/papikos/duinqxpgxbcowif87tfe.png",
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      device_id: req.body.device_id
    }

    // Check username or email already exist
    modelAuth.registerUserCheck(data).then(result => {
      if (result.length === 0) {
        return modelAuth
          .registerUser(data)
          .then(result => {
            data.id = result.insertId
            res.send({
              status: 200,
              message: "User successfully registered!",
              data: data
            })
          })
          .catch(err => console.log(err))
      } else {
        return res.status(400).send({
          status: 400,
          message: "Username or Email already registered!"
        })
      }
    })
  },
  registerPartner: (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const data = {
      fullname: req.body.fullname,
      labelName: req.body.labelName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      photo:
        "https://res.cloudinary.com/zerefweismann/image/upload/v1568823411/papikos/duinqxpgxbcowif87tfe.png",
      address: req.body.address,
      latitude: "-7.758518",
      longitude: "110.378147",
      id_location: 8,
      device_id: req.body.device_id,
      gender: "mix",
      images:
        "https://d1nabgopwop1kh.cloudfront.net/hotel-asset/1615175216470708059_wh"
    }

    modelAuth.registerPartnerCheck(data).then(result => {
      if (result.length === 0) {
        return modelAuth
          .registerPartner(data)
          .then(result => {
            data.id = result.insertId
            res.send({
              status: 200,
              message: "Partner successfully registered!",
              data: data
            })
          })
          .catch(err => console.log(err))
      } else {
        return res.status(400).send({
          status: 400,
          message: "Username or Email already registered!"
        })
      }
    })
  },
  loginUser: (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password
    }
    const data2 = {
      device_id: req.body.device_id
    }

    modelAuth
      .loginUser(data)
      .then(result => {
        const validPassword = bcrypt.compareSync(
          req.body.password,
          result[0].password
        )
        if (!validPassword) {
          return res.status(400).send({
            status: 400,
            message: "Wrong Password!"
          })
        }
        modelUser
          .updateUser(data2, result[0].id)
          .then(rs => {
            result[0].device_id = data2.device_id
            // console.log(result)
            const token = jwt.sign(
              {
                id: result[0].id,
                username: result[0].username
              },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "10h"
              }
            )
            res.send({
              status: 200,
              message: "Login successfully!",
              data: result,
              token
            })
          })
          .catch(err => {
            res.status(400).send({
              status: 400,
              err
            })
          })
      })
      .catch(err => {
        res.status(400).send({
          status: 400,
          message: "Username does not exist",
          err
        })
      })
  },
  loginPartner: (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    const data2 = {
      device_id: req.body.device_id
    }

    modelAuth
      .loginPartner(data)
      .then(result => {
        const validPassword = bcrypt.compareSync(
          req.body.password,
          result[0].password
        )
        if (!validPassword) {
          return res.status(400).send({
            status: 400,
            message: "Wrong Password!"
          })
        }
        modelPartner
          .updatePartner(data2, result[0].id)
          .then(rs => {
            result[0].device_id = data2.device_id

            const token = jwt.sign(
              {
                id: result[0].id,
                username: result[0].username
              },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "10h"
              }
            )
            res.send({
              status: 200,
              message: "Login successfully!",
              data: result,
              token
            })
          })
          .catch(err => {
            res.status(400).send({
              status: 400,
              err
            })
          })
      })
      .catch(err => {
        res.status(400).send({
          status: 400,
          message: "Username does not exist",
          err
        })
      })
  }
}
