const http = require('http')

exports.getOptions = (host, port) => {
  return (path, method, token = '') => {
    const options = {
      host,
      port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (token) options.headers['X-Auth-Token'] = token
    return options
  }
}

exports.httpRequest = (options, res, body = '') => {
  let data = ''

  const request = http.request(options, (response) => {
    response.on('data', d => {
      data += data + d
    }).on('end', () => {
      res.send({
        code: response.statusCode,
        data: JSON.parse(data)
      })
    })
  })

  request.on('error', function (e) {
    console.log('Got error: ' + e.message)
  })

  if (body) request.write(body)
  request.end()
}
