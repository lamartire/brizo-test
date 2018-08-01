import axios from 'axios'

const { API_TOKEN, API_URL } = process.env

export const getErrorCode = err => {
  const [code] = err.message.match(/[0-9]{3}/)

  return parseInt(code)
}

export const createErrorMessage = (message, text) =>
  // eslint-disable-next-line
  message.replace(/\%s/, text)

export const apiFetch = async (path, params) => {
  try {
    const res = await axios({
      url: `${API_URL}/api${path}`,
      headers: {
        common: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
      ...params,
    })

    return res
  } catch (err) {
    const errorCode = getErrorCode(err)

    switch (errorCode) {
      case 401:
        throw new Error('Unauthenticated: %s')
      case 403:
        throw new Error('Not allowed: %s')
      case 404:
        throw new Error('Not found: %s')
      case 422:
        throw new Error('Invalid data: %s')
      default:
        throw err
    }
  }
}
