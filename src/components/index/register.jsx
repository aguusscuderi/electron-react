import RegisterForm from "./registerForm"
import { useEffect, useState } from "react"
import Spinner from '../front-stuff/spinner'

export default function Register () {
    //const [loading, setLoading] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const [datosRegister, setDatosRegister] = useState({
        username: '',
        email: '',
        pswd: ''
    })
    const [datosLogin, setDatosLogin] = useState({
        emailLogin: '',
        pswdLogin: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setDatosRegister({ ...datosRegister, [name]: value})
        console.log(datosRegister)
    }

    const handleLoginChange = (e) => {
        const {name, value} = e.target
        setDatosLogin({...datosLogin, [name]:value})
        console.log(datosLogin)
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true)     
        console.log(datosLogin)
        //setLoading(false)
        setSpinner(false)
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();
        setSpinner(true)
        console.log(datosRegister)
        //setLoading(false)
        setSpinner(false)
        }

    /*useEffect(() => {
        fetch('/api/').then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonMock => console.log(jsonMock, 'esta es la data del mock'))
    }, [])*/

    return(
        <>
        <RegisterForm handleLoginSubmit={handleLoginSubmit} handleLoginChange={handleLoginChange}
         handleSubmit={handleSubmit} handleChange={handleChange}></RegisterForm>
        {spinner === true ? <Spinner/> : ''}
        </>
     
    )
}