const jwt = require('jsonwebtoken')
const { admin } = require('../config')

const getPasswordByName = (name) => {
  if (name === 'admin') return admin.password
}

exports.login = (req, res) => {
  const { userName, password } = req.body
  if (!userName) res.status(400).send({ mes: 'user name is empty' })
  else {
    const userPwd = password ? getPasswordByName(userName) : ''
    if (!userPwd || !password || userPwd !== password) {
      res.status(401).send({ mes: 'user name or password is wrong' })
    } else {
      res.send({
        token: jwt.sign(
          { name: userName },
          'login',
          { expiresIn: '1d' })
      })
    }
  }
}

exports.authorization = (req, res) => {
  const loginToken = req.cookies.login
  if (!loginToken) res.status(401).send('there is no login token, please login')
  else {
    jwt.verify(loginToken, 'login', (error, decode) => {
      if (error) res.status(401).send('token error')
      else {
        req.token = decode.name
        next()
      }
    })
  }
}
