import { useState, useEffect } from "react"
import { Button, Popover, PopoverBody, PopoverHeader, Spinner } from "reactstrap"
import { ClimaConsultar } from "./ClimaConsultar"
import Avatar from '@components/avatar'
import { Compass, MinusCircle, Navigation2, PlusCircle } from "react-feather"

export const NavbarClima = props => {
    // Obtuve los datos.
    const { locationUser } = props
    //
    const [general, setGeneral] = useState([])
    const [iconoDinamic, setIconoDinamic] = useState([])
    const [iconoStat, setIconoStat] = useState([])
    const [datosIcono, setDatosIcono] = useState([])
    console.log(iconoDinamic)
    //
    const [popoverOpen, setPopoverOpen] = useState(false)
    const kelvin = 273.15
    const multipli = 0.001

    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const fecha = new Date()
    console.log(fecha)
    const dia_semana = dias_semana[fecha.getDay()]
    const day = fecha.getDate()
    const month = meses[fecha.getMonth()]
    const year = fecha.getFullYear()

    console.log(dia_semana, day, month, year)

    const getClima = async () => {
        const { iconos, resultado } = await ClimaConsultar(locationUser)
        const themeImagen3 = {
            img2: require(`./archivo/${iconos[0].icon}.svg`).default
        }
        const themeImagen = {
            img: require(`./archivo/${iconos[0].icon}.png`).default
        }
        setGeneral(resultado)
        setDatosIcono(iconos[0])
        setIconoStat(themeImagen)
        setIconoDinamic(themeImagen3)
    }

    const getImagen = props => {
        const [img2] = props
        console.log(img2.img2)

    }

    useEffect(() => {
        // condicion para saber si el usuario acepto la ubicacion
        // Funcion para obtener clima de la api
        if (locationUser.loaded) {
            getClima()
            // handleSubmit()
        }

        if (locationUser.loaded) {
            console.log("Si icon")
            const themeImagen = [
                {
                    img2: require(`./archivo/09d.png`).default
                }
            ]
            getImagen(themeImagen)

        } else {
            console.log("No icon")
        }

    }, [locationUser.loaded])

    // useeffect para correr la funcion de obtener clima
    // -- en las dependencias escuchar locationUser.loaded
    //------ cuando locationUser.lodaded === true correr la funcion 
    return (
        <>
            {
                locationUser.loaded && iconoDinamic.img2 ? (
                    <>
                        <Button color='flat-success' className="p-0" outline id="controlledPopover">
                            <Avatar img={iconoDinamic.img2} />
                        </Button>
                        <Popover
                            placement="top"
                            target='controlledPopover'
                            isOpen={popoverOpen}
                            toggle={() => setPopoverOpen(!popoverOpen)}
                        >
                            {/* <PopoverHeader>{general.name}, {general.sys.country}</PopoverHeader> */}
                            <PopoverHeader>
                                <div className="">
                                    <h2>{general.name}, {general.sys.country}</h2>
                                    <p className="mb-0">{dia_semana}, {day} de {month} del {year}</p>
                                </div>
                            </PopoverHeader>
                            <PopoverBody>
                                <div className="list-item d-flex align-items-lg-start mb-0 jus">
                                    <div className="me-1">
                                        <Avatar img={iconoStat.img} size='lg' />
                                    </div>
                                    <div className="list-item-body flex-grow-1">
                                        <p className="fs-1 mt-1 mb-0">{parseInt(general.main.temp - kelvin)} <span>&#x2103;</span>.</p>
                                        <p className="mt-0"> {datosIcono.description}.</p>
                                    </div>
                                </div>
                                <h6 className="">Se siente con: {parseInt(general.main.feels_like - kelvin)}<span>&#x2103;</span>.</h6>
                                <div className="row mt-1 align-items-center">
                                    <p className="col">Humedad: {general.main.humidity}%</p>
                                    <p className="col p-0 text-center"><Navigation2 /> {general.wind.speed}m/s</p>
                                </div>
                                <div className="row mb-0 align-items-center justify-content-between">
                                    <p className="col-7 pe-0">Visibilidad: {(general.visibility * multipli).toFixed(1)}km</p>
                                    <p className="col-5 p-0 text-center "><Compass /> {general.main.pressure}hPa</p>
                                </div>

                                <div className="row aling-items-center">
                                    <p><PlusCircle /> Temperatura maxima: {parseInt(general.main.temp_max - kelvin)}<span>&#x2103;</span></p>
                                    <p><MinusCircle /> Temperatura minima: {parseInt(general.main.temp_min - kelvin)}<span>&#x2103;</span></p>
                                </div>

                            </PopoverBody>
                        </Popover>
                    </>
                ) : <Spinner color='success' />
            }
        </>
    )
}