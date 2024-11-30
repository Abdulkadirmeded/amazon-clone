import React, { useState } from 'react'
import { darkLogo } from "../assets/index"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/ClipLoader";
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';


function Signin() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [userErrorEmail, setUserErrorEmail] = useState("");
  const [userErrorPassword, setUserErrorPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  const handleEmail = (e)=>{
    setEmail(e.target.value);
    setErrorEmail("");
  }

  const handlePassword = (e)=>{
    setPassword(e.target.value);
    setErrorPassword("");
  }


  const emailValidation = ()=>{
    return String(email).toLowerCase().match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  }

  const handleRegistration =(e)=>{
    e.preventDefault()
    if(!email){
      setErrorEmail("Enter your email");
    }else{
      if(!emailValidation(email)){
        setErrorEmail("Enter a valid email")
      }
    }
    if(!password){
      setErrorPassword("Enter your password") ;
    }else{
      if(password.length < 6 ){
        setErrorPassword("password must be at least 6 characters");
      }
    }
    
    
    if(email && emailValidation(email) && password && password.length >=6)
      {
        const auth = getAuth();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch(setUserInfo({
              _id:user.uid,
              userName:user.displayName,
              email:user.email,
              image:user.photoURL
            }))
            // ...
            setLoading(false)
            setSuccessMsg("Logged successfull! welcom you back!");
            setTimeout(()=>{
              navigate("/")
            }, 2000)
          })
          .catch((error) => {
           if(errorCode.includes("auth/inalid-email")) {
            setUserErrorEmail("Invalid Email");
           }
           if(errorCode.includes("auth/wrong password")) {
            setUserErrorPassword("Wrong password! try again")
           }
          });
      
      setEmail("")
      setPassword("")
     }
  }
  
  return (
    <div className='w-full'>
        <div className='w-full bg-gray-100 pb-10'>
         {
          successMsg ? (<div>
              <motion.p  className='text-base font-titleFont font-semibold 
                        text-green-500 border-[1px] border-green-500 
                        px-2 text-center'
                        >
                          {successMsg}</motion.p>
          </div>
          ) : (
             <form className='w-[350px] mx-auto flex flex-col items-center'>
             <Link to="/">
             <img className='w-32 cursor-pointer' src={darkLogo} alt="dark-logo" />
             </Link>
             <div className='w-full border border-zinc-200 p-6'>
               <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign in</h2>
               <div className='flex flex-col gap-3'>
                 <div className='flex flex-col gap-2'>
                   <p className='text-sm font-medium'>
                     Email or mobile phone number</p>
 
                   <input 
                    onChange={handleEmail}
                    value={email}
                   className='w-full py-1 border lowercase border-zinc-400 
                   px-2 text-base rounded-sm outline-none focus:focus-within:border-[#e77600]
                   focus:focus-within:shadow-amazonInput duration-100' type="email" />
                   {
                     errorEmail && (
                       <p className='text-red-600 text-xs font-semibold tracking-wide
                       flex items-center gap-2 mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                        {errorEmail}</p>
                     )
                   }
                   {userErrorPassword && (
                     <p className='text-red-600 text-xs font-semibold 
                     tracking-wide felx items-center'>
                       <span className='italic font-titleFont font-extralight text-base'>
                         !
                       </span>
                       {userErrorPassword}
                     </p>
                   )
 
                   }
                   {userErrorEmail && (
                     <p className='text-red-600 text-xs font-semibold 
                     tracking-wide felx items-center'>
                       <span className='italic font-titleFont font-extralight text-base'>
                         !
                       </span>
                       {userErrorEmail}
                     </p>
                   )
 
                   }
                 </div>
                 <div className='flex flex-col gap-2'>
                   <p className='text-sm font-medium'>password</p>
 
                   <input 
                   onChange={handlePassword}
                   value={password}
                   className='w-full py-1 border border-zinc-400 
                   px-2 text-base rounded-sm outline-none focus:focus-within:border-[#e77600]
                   focus:focus-within:shadow-amazonInput duration-100' type="password" />
                    {
                     errorPassword && (
                       <p className='text-red-600 text-xs font-semibold tracking-wide
                       flex items-center gap-2 mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                        {errorPassword}</p>
                     )
                   }
                   {userErrorEmail && (
                     <p className='text-red-600 text-xs font-semibold 
                     tracking-wide felx items-center'>
                       <span className='italic font-titleFont font-extralight text-base'>
                         !
                       </span>
                       {errorEmail}
                     </p>
                   )
 
                   }
                 </div>
 
                 <button
                 onClick={handleRegistration}
                 className='w-full py-1.5 text-sm font-normal
                 rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b
                 border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
                   Continue
                   </button>
 
                   {
                     loading && (
                       <div className='flex justify-center'>
                         <FadeLoader 
                         strokColor="#febd69"
                         strokWidth="5"
                         animationDuration="0.75"
                         width="50"
                         visible={true} />
                       </div>
                     )
                   }
 
               </div>
               <p className='text-xs  text-black leading-4 mt-4'>By Continuing, you agree to Amazon's <span 
               className='text-blue-600'>Conditions of use {" "}</span> and 
                <span className='text-blue-600'>privacy notice</span></p>
                 <p className='text-xs text-gray-600 mt-4 group cursor-pointer'><ArrowRightIcon /> 
                 <span className='text-blue-600 group-hover:text-orange-700 group-hover:underline 
                 underline-offset-1'>Need help?</span></p>
             </div>
             <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
                 <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                 <span className='w-1/3 text-center'>New to Amazon?</span>
                 <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
             </p>
            <Link className='w-full' to="/registration">
            <button
   
             className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm
             bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b
             border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
               Create Your Amazon account
               </button>
            </Link>
           </form>
          )

         }
        </div>
        <div className='w-full bg-gradient-to-t from-white py-10
        via-white to-zinc-200 flex flex-col gap-4 justify-center items-center'>
          <div className='flex items-center gap-6'>
            <p className='text-blue-600 hover:text-orange-700 hover:underline 
                underline-offset-1 cursor-pointer duration-100'>
                  Conditions of use
            </p>
            <p className='text-blue-600 hover:text-orange-700 hover:underline 
                underline-offset-1 cursor-pointer duration-100'>
                  privacy notice
            </p>
            <p className='text-blue-600 hover:text-orange-700 hover:underline 
                underline-offset-1 cursor-pointer duration-100'>
                  privacy notice
            </p>
          </div>
          <p className='text-xs text-gray-600'>1996-2024, ReactBd.com, Inc, 
            or its affiliates</p>
        </div>
    </div>
  )
}

export default Signin
