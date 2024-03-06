import { useState } from "react";
import GenderCheckBox from "./GenderChecBox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

export default function Signup() {
  const [inputs,setInputs]=useState({
    fullName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    gender:''
  })
  const {loading,signup}=useSignup()
  const handleChangeCheckbox=(gender)=>{
    setInputs({...inputs,gender})
  }
  const handleSubmit=async(e)=>{
    
    e.preventDefault()
    await signup(inputs)
    console.log("inputs",inputs)

  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
		<div>
              <label className="label p-2">
              <span className="text-base label-text text-black" >Full Name</span>
              </label>
              <input type="text" placeholder="Abhijit Aundhkar" className="w-full input input-bordered h-10" 
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
              />
            </div>
			<div>
              <label className="label p-2">
              <span className="text-base label-text text-black">Username</span>
              </label>
              <input type="text" placeholder="Abhijit" className="w-full input input-bordered h-10" 
              value={inputs.userName}
              onChange={(e)=>setInputs({...inputs,userName:e.target.value})}
              />
            </div>
			<div >
              <label className="label p-2">
              <span className="text-base label-text text-black">Password</span>
              </label>
              <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs,password:e.target.value})}
              />
            </div>
			<div>
              <label className="label p-2">
              <span className="text-base label-text text-black">Confirm Password</span>
              </label>
              <input type="password" placeholder="confirm password" className="w-full input input-bordered h-10" 
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
              />
            </div>

			<GenderCheckBox onCheckBoxChange={handleChangeCheckbox} selectedGender={inputs.gender}/>
			<Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black">{"Already"} have account</Link>
            <div >
              <button className="btn btn-block btn-sm mt-2 border-slate-700" disabled={loading}>{loading ? <span className="loading loading-spinner" />:"Sign Up"}</button>

            </div>
        </form>
      </div>
    </div>
  );
}
