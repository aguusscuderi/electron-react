import RegisterForm from "./registerForm"
import { useContext, useEffect, useState } from "react"
import Spinner from '../front-stuff/spinner'
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import Menu from '../menu/menu'

export default function Register () {
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const [datosRegister, setDatosRegister] = useState({
        username: '',
        email: '',
        pswd: ''
    })
    const [datosLogin, setDatosLogin] = useState({
        username: '',
        pswd: ''
    })
    let [userData, setUserData] = useState({})
    //const { user, getUser } = useContext(UserContext)
    const [logged, setLogged] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setDatosRegister({ ...datosRegister, [name]: value})
        console.log(datosRegister)
    }

    const handleLoginChange = (e) => {
        const {name, value} = e.target
        setDatosLogin({...datosLogin, [name]:value})
        //console.log(datosLogin)
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true)     
        let response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            body: JSON.stringify(datosLogin),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })

        const data = await response.json()
        //console.log(data)
        navigate('/api/successlogin')
        setSpinner(false)
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();
        setSpinner(true)
        console.log(datosRegister)
        //setLoading(false)
        setSpinner(false)
    }

    return(
        <>
        <RegisterForm handleLoginSubmit={handleLoginSubmit} handleLoginChange={handleLoginChange}
         handleSubmit={handleSubmit} handleChange={handleChange}></RegisterForm>
        {spinner === true ? <Spinner/> : ''}
        </>
     
    )
}