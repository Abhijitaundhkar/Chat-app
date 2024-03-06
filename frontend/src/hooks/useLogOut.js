import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout=() =>{

    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()


    const logOut=async()=>{
        setLoading(true)
        try {
            const res=await fetch("/api/auth/logOut",{
                method:"POST",
                headers:{"Context-Type":"application/json"}
            });
            const data=res.json()
            if(data.error){
                toast.error(data.error)
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        } catch (error) {
            throw toast.error(error)
        }
        finally{
            setLoading(false)
        }
    } 
    return {loading,logOut}
  
}

export default useLogout
