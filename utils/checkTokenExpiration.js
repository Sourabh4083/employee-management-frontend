import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    return decoded.exp < now // true if expired
  } catch (err) {
    console.error('Invalid token:', err)
    return true
  }
}
