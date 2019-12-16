// 'use strict'
// const mongoose = require('mongoose')
// const schema = mongoose.Schema
// const bcrypt = require('bcrypt-nodejs')
// const crypto = require('crypto')


// // const userSchema = new schema({
// //     email: { type: String, unique: true },
// //     displayName: String,
// //     avatar: String,
// //     password: { type: String, select: false },
// //     signupDate: { type: Date, default: Date.now() },
// //     lasLogin: Date
// // })
// const userSchema = {
//     email: { type: String, unique: true },
//     displayName: String,
//     avatar: String,
//     password: { type: String, select: false },
//     signupDate: { type: Date, default: Date.now() },
//     lasLogin: Date
// }

// userSchema.pre('save', function (next) {
//     let user = this
//     if (!user.isModified('password')) {
//         return next()
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next()
//         }
//         bcrypt.hash(user.password, salt, null, (err, hash) => {
//             if (err) {
//                 return next(hash)
//             }
//             user.password = hash
//             next()
//         })
//     })
// })

// userSchema.methods.gravatar = () => {
//     if (!this.email) {
//         return 'https://gravatar.com/avatar/?s=200&d=retro'
//     }
//     const md5 = crypto.createHash('md5').update(this.email).digest('hex')
//     return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
// }
// module.exports = mongoose.model('User', userSchema)