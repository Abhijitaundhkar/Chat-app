import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";



function useSignup() {
  
  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext()
  const signup = async ({fullName,userName,password,confirmPassword,gender}) => {
    const success = handleInputError({fullName,userName,password,confirmPassword,gender});
    console.log("success",success)
    if (!success) return;
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
			});
      const data = await res.json();
      if (data.error) {
				return toast.error(data.error);
			}
      console.log("data",data);
      localStorage.setItem("chat-user",JSON.stringify(data))
      setAuthUser(data)

    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup }
}

export default useSignup;
function handleInputError({fullName,userName,password,confirmPassword,gender}) {
  if (!fullName ||!userName ||!password ||!confirmPassword ||!gender) {
    toast.error("Please fill all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password is not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password is more than 6 char");
    return false;
  }
  return true
}