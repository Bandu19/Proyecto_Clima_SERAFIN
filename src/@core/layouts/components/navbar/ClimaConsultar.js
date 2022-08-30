export const ClimaConsultar = async (locationUser) => {
    // console.log(locationUser.coordinates)
    try {
        const { coordinates } = locationUser
        const { lat, lon } = coordinates
        const appId = 'bf7d0efe08cdfc7894cb8399231d7136'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&lang=es`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        console.log(resultado)
        const { coord, main, weather } = resultado
        // const tempResultado = Object.keys(coord) -Dato Important

        return {
            iconos: weather,
            coordenadas: coord,
            resultado,
            menu: main
        }

    } catch (error) {
        console.log(error)
    }
}