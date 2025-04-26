import { jwtDecode } from 'jwt-decode'


export const verifyExpiredToken = (token: string) => {
  try {
    const { iat } = jwtDecode(token)
    const currentTime = Date.now()

    // Convertir 'iat' de segundos a milisegundos
    const tokenCreationTime = iat! * 1000

    // Verificar si ha pasado más de 3 minutos (180,000 ms)
    if (currentTime - tokenCreationTime > 60000) {
      return { expired: true }
    }
    return { expired: false }
  } catch (error) {
    console.error('Error decoding token:', error)
    return { expired: true } // En caso de error al decodificar el token, considerarlo expirado
  }
}

