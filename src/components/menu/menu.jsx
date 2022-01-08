import { useEffect } from "react"
import {Link} from "react-router-dom"

export default function Menu(){
    useEffect(() => {
        try{
            fetch("http://localhost:8080/api/successlogin")
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
        }catch(e){
            console.log(e, 'fetch cart error')
        }
     
    }, [])
    return(
        <>
        <h1>HOLAAA</h1>
        <Link to="/">registro</Link>
        </>
    )
}