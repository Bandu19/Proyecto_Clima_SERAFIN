import { useEffect, useState } from "react"


export const useGeoLocation = () => {

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lon: "" }
    })

    const onSeccess = (location) => {
        // console.log(location)
        setLocation({
            loaded: true,
            coordinates: { lat: location.coords.latitude, lon: location.coords.longitude }
        })
    }

    const onError = (errors) => {
        console.log(errors)
        setLocation({
            loaded: false,
            coordinates: { lat: "", lon: "" }
        })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation is not supported"
            })
        }

        navigator.geolocation.getCurrentPosition(onSeccess, onError)
    }, [])

    return location
}