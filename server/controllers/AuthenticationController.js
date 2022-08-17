const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/passportKey')

function jwtSignUser (user) {
     const ONE_WEEK = 60 * 60 * 24 * 7
     return jwt.sign(user, config.authentication.jwtSecret, {
          expiresIn: ONE_WEEK
     })
}

module.exports = {
     async register (req, res) {
          try {
               const user = await User.create(req.body)
               res.send(user.toJSON());
          } catch (error) {
               res.status(400).send({
                    error: "This email account has been registered."
               })
          }
     },

     async login (req, res) {
          try {
               const {email, password} = req.body
               const user = await User.findOne({
                    where: {
                         email: email
                    }
               })

               if (!user){
                    return res.status(403).send({
                         error: 'The login information was incorrect'
                    })
               }
               
               const isMatch = await bcrypt.compare(password, user.password)
               // console.log('req password ', password, user.password)
               
               if (!isMatch){
                    return res.status(403).send({
                         error: 'The login password was incorrect'
                    })
               }

               const userJson = user.toJSON()
               res.status(200).json({
                    user: userJson,
                    token: jwtSignUser(userJson)
               })
          } catch (error) {
               res.status(500).send({
                    error: "invalid login information."
               })
          }
     }
}