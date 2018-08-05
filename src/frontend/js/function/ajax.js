const ajax = (opts) => {
  return new Promise((resolve, reject) => {
    const request = new window.XMLHttpRequest()

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(request.responseText)
      }
    }

    request.open(opts.type, opts.url, true)
    request.setRequestHeader('Content-type', 'application/json')
    request.send(JSON.stringify(opts.query))
  })
}

module.exports = ajax
