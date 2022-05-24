import { UserContext } from '../../context/userContext'
import { useContext, useEffect } from 'react'
export default function Dash() {
    const  { getData, user } = useContext(UserContext)
    useEffect(()=>{
        getData()
    },[])
    return (
        <h1>Hola! {user.email}</h1>
    )
}