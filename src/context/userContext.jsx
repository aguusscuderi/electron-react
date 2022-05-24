import { createContext, useState } from "react";
import axios from 'axios'

export const UserContext = createContext({})

export default function UserContextLogic({children}) {
    const [user, setUser] = useState({})
    const getData = async () => {
        try {
            await axios({
                 method: 'GET',
                 withCredentials: true,
                 url: 'http://localhost:8080/api/user'
             }).then((res)=>{
                 const userdata = res.data
                 setUser({...userdata})
                 console.log(userdata)
             })
         } catch (error) {
             console.log(error, 'the error on fetch')
         } 
    }


    return  <UserContext.Provider value={{ user, getData}}>
            {children}
    </UserContext.Provider>
}