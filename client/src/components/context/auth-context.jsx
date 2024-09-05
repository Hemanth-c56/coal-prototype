import { createContext } from "react"

export const AuthContext = createContext({
    isLoggedIn : false,
    userId : null,
    company: null,
    post: null,
    login: ()=>{},
    logout: ()=>{}
})