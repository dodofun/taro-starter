const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const {method, data, url} = requestParams
  return chain.proceed(requestParams)
    .then(res => {
      // Response
      return res
    })
}

export default interceptor
