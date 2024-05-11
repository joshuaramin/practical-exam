import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'

export default  function Auth () {

    const [ token, setToken ] = useState(null)

    useEffect(() => {
        const cookies: any = Cookies.get("access_token")

        if(cookies){ 
                
            const { userID }: any  = jwtDecode(cookies) 

            setToken(userID)
        } 
    }, [  ])

    return token
}