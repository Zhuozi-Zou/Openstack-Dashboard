exports.getOptions = (host, port) => {
  return (path, method) => {
    return {
      host,
      port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}
