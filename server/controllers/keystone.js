const http = require('http')
const { host, admin } = require('../config')
const { name, password } = admin
const port = 5000
const getOptions = require('../lib/util').getOptions(host, port)

exports.getAdminToken = (req, res) => {
  const authBody = {
    auth: {
      identity: {
        methods: ['password'],
        password: {
          user: {
            name,
            domain: {
              name: 'Default'
            },
            password
          }
        }
      }
    }
  }
  const authBodyString = JSON.stringify(authBody)

  const options = getOptions('/v3/auth/tokens', 'POST')
  options.headers['Content-Length'] = authBodyString.length

  const request = http.request(options, (response) => {
    response.on('data', d => {
    }).on('end', () => {
      res.status(response.statusCode).send(response.headers['x-subject-token'])
    })
  })

  request.on('error', function (e) {
    console.log('Got error: ' + e.message)
  })

  request.write(authBodyString)
  request.end()
}
