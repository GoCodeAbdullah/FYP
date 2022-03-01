var bcrypt = require('bcryptjs')

const { Validate } = require('../models/customerDetails')

function validateCoustomer(req, res, next) {
  let { error } = Validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}

// async function passwordHash(req, res, next) {
//   try {
//     let password = req.body.user_id.password

//     let salt = await bcrypt.genSalt(10)
//     let hashpassword = await bcrypt.hash(password, salt)
//     req.body.user_id.password = hashpassword
//     next()
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// }
// module.exports.Hash = passwordHash
module.exports.Verify = validateCoustomer
