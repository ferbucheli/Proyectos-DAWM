export interface JwtResponse {
        nombre: string,
        correo: string,
        apellido: string,
        direccion: {
                pais: string,
                ciudad: string,
                calle: string
        }
        accessToken: string,
        expiresIn: string,
}
