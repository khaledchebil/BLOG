const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose  = require('mongoose')





AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

// const ADMIN = {
//     email: process.env.ADMIN_EMAIL || 'admin@admin.com',
//     password: process.env.ADMIN_PASSWORD || 'admin'
// }

const ADMIN = {
    email: 'admin@admin.com',
    password: 'admin',
  }

// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//     cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
//     cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
//     authenticate:async (email, passport) => {
//         if (email === ADMIN.email && password === ADMIN.password) {
//             return ADMIN
//         }
//         return null
//     }
// })

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN
      }
      return null
    },
    cookieName: 'adminbro',
    cookiePassword: 'somePassword',
  })

module.exports = router