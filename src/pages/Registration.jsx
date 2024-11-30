import React, { useState } from 'react'
import { darkLogo } from "../assets/index"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/ClipLoader";




function Registration() {
  const navigate = useNavigate()
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  //error message start
  const [errorClientName, setErrorClientName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCPassword, setErrorCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");


  const [loading, setLoading] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  //handle function start
  const handleClientName = (e)=>{
    setClientName(e.target.value)
    setErrorClientName("")
  }

  const handleEmail = (e)=>{
    setEmail(e.target.value);
    setErrorEmail("");
  }

  const handlePassword = (e)=>{
    setPassword(e.target.value);
    setErrorPassword("");
  }

  const handleCPassword = (e)=>{
    setCPassword(e.target.value);
    setErrorCPassword("");
  }

  // email validation

  const emailValidation = ()=>{
    return String(email).toLowerCase().match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  }


  // submit buttton start
  const handleRegistration =(e)=>{
    e.preventDefault()
    if(!clientName){
      setErrorClientName("Enter your name");
    }
    if(!email){
      setErrorEmail("Enter your email");
      setFirebaseErr("")
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
    if(!cpassword){
      setErrorCPassword("Comfirm your password") 
    }else{
      if(cpassword !== password){
        setErrorCPassword("password not matched")
      }
    }
    
    if(clientName && email && emailValidation(email) && 
    password && password.length >=6
     && cpassword && cpassword === password)
     {
      
      setLoading(true)
      const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    updateProfile(auth.currentUser, {
      displayName:clientName,
      photoURL: "https://media.licdn.com/dms/image/v2/D5603AQHnCejGNtlZdA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706947141703?e=1738195200&v=beta&t=eBPc8Jrb1jBjPhthgdpFIHt8ay-sUZ6wa3eIIEFlCB4",
    })
    // Signed up 
    const user = userCredential.user;
    setLoading(false)
    setSuccessMsg("Account Created Successfully!");
    setTimeout(()=>{
      navigate("/signin")
    },3000)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode.includes("auth/email-already-in-use")) {
      setFirebaseErr("Email already in use, try another one")
    }
    // ..
  });
      setClientName("")
      setEmail("")
      setPassword("")
      setCPassword("")
      setFirebaseErr("")
     }
  }


  return (
    <div className='w-full '>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[350px] mx-auto flex flex-col items-center'>
          <img className='w-32 ' src={darkLogo} alt="dark-logo" />
          <div className='w-full border border-zinc-200 p-6'>
            <h2 className='font-titleFont text-3xl font-medium mb-4'>
              Create Account
              </h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Your name</p>
                  <input
                  onChange={handleClientName}
                  value={clientName}
                  className='w-full py-1 border border-zinc-400 
                  px-2 text-base rounded-sm outline-none focus:focus-within:border-[#e77600]
                  focus:focus-within:shadow-amazonInput duration-100'
                  type="text" />
                  {
                    errorClientName && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide
                      flex items-center gap-2 mt-1.5'>
                       <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                       {errorClientName}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Email or phone number</p>
                  <input
                  onChange={handleEmail}
                  value={email}
                  className='w-full lowercase py-1 border border-zinc-400 
                  px-2 text-base rounded-sm outline-none focus:focus-within:border-[#e77600]
                  focus:focus-within:shadow-amazonInput duration-100'
                  type="email" />
                   {
                    errorEmail && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide
                      flex items-center gap-2 mt-1.5'>
                       <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                       {errorEmail}</p>
                    )
                  }
                   {
                    firebaseErr && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide
                      flex items-center gap-2 mt-1.5'>
                       <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                       {firebaseErr}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Password</p>
                  <input 
                  onChange={handlePassword}
                  value={password}
                  className='w-full py-1 border border-zinc-400 
                  px-2 text-base rounded-sm outline-none focus:focus-within:border-[#e77600]
                  focus:focus-within:shadow-amazonInput duration-100'
                  type="password" />
                   {
                    errorPassword && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide
                      flex items-center gap-2 mt-1.5'>
                       <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                       {errorPassword}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Re-enter Password</p>
                  <input
                  onChange={handleCPassword}
                  value={cpassword}
                  className='w-full py-1 border border-zinc-400 
                  px-2 text-base rounded-sm outline-none focus:focus-within:border-[#e77600]
                  focus:focus-within:shadow-amazonInput duration-100'
                  type="password" />
                   {
                    errorCPassword && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide
                      flex items-center gap-2 mt-1.5'>
                       <span className='italic font-titleFont font-extrabold text-base'>!</span> 
                       {errorCPassword}</p>
                    )
                  }
                  <p className='text-xs text-gray-600'>
                    passwords must be at least 6 characters</p>
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
                  },
                  {
                    successMsg && (
                      <div>
                        <motion.p 
                        initial={{y:10, opacity: 0}}
                        animate={{y:0, opacity: 1}}
                        transition={{duration: 0.5}}
                        className='text-base font-titleFont font-semibold 
                        text-green-500 border-[1px] border-green-500 
                        px-2 text-center'
                        >
                          {successMsg}
                          </motion.p>
                      </div>
                    )
                  }
              </div>
              <p className='text-xs  text-black leading-4 mt-4'>
                By Continuing, you agree to Amazon's <span 
              className='text-blue-600'>Conditions of use {" "}</span> and 
               <span className='text-blue-600'>privacy notice</span></p>
          </div>
          <div>
            <p className='text-xs text-black'>Already have an account? 
              <Link to="/signin">
              <span className='text-blue-600 hover:text-orange-700 hover:underline 
                underline-offset-1 cursor-pointer duration-100'>Sign in <span><ArrowRightIcon />
              </span></span>
              </Link>
              </p>
              <p className='text-xs text-black mt-2'>Buying for work? <span className='text-blue-600 
              hover:text-orange-700 hover:underline 
                underline-offset-1 cursor-pointer duration-100'>create a free business account</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
