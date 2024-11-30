import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {motion} from "framer-motion";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideBarContent from './SideBarContent';
import CloseIcon from '@mui/icons-material/Close';


function HeaderBottom() {
  const [sideBar, setSideBar] = useState(false);
  const ref=useRef();
  useEffect(()=>{
    document.body.addEventListener("click",(e)=>{
      if(e.target.contains(ref.current)){
        setSideBar(false);
      }
    })
  }, [ref.sideBar])
  return (
    <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
      <ul className='flex items-center gap-2 text-sm tracking-wide'>
        <li onClick={() =>setSideBar(true)} className='headerHover flex items-center gap-1'><MenuIcon />All</li>
        <li className='headerHover sm:max-md:hidden mdl:inline-flex '>Today's Deals</li>
        <li className='headerHover sm:max-md:hidden mdl:inline-flex '>Customer service</li>
        <li className='headerHover sm:max-md:hidden mdl:inline-flex '>Gift Cards</li>
        <li className='headerHover sm:max-md:hidden mdl:inline-flex '>Registry</li>
        <li className='headerHover sm:max-md:hidden mdl:inline-flex '>Sell</li>
      </ul>
    {
      sideBar && (
        <div className='w-full h-screen text-black fixed top-0 bg-amazon_blue
        bg-opacity-50'>
          <div className='w-full h-full relative '>
              <motion.div ref={ref} initial={{x:-500, opacity:0}} animate={{x:0, opacity:1}} 
              transition={{duration:0.5}} className='w-[80%] sm:max-md:w-[250px] h-full bg-white border border-black'>
                <div className='w-full bg-amazon_light text-white py-2 px-6 
                flex items-center gap-4'>
                    <AccountCircleIcon />
                    <h3 className='font-titleFont font-bold text-lg
                    tracking-wide'>Hello, Sign In</h3>
                </div>
                    <SideBarContent
                    title="Digital content & Devices"
                    one="Amazon Music"
                    two="Kindle E-readers & Books"
                    three="Amazon Appstore"
                    />
                    <SideBarContent 
                    title="Shop By Departement"
                    one="Electronics"
                    two="Computer"
                    three="Smart Home"
                    />
                    <SideBarContent 
                    title="Progress & Features"
                    one="Gift Cards"
                    two="Amazon Live"
                    three="Internation Shopping"
                    />
                    <SideBarContent 
                    title="Help & Setting"
                    one="Your Account"
                    two="Custemer serivce"
                    three="Contact us"
                    /> 
                    <span onClick={()=>setSideBar(false)} 
                  className='cursor-pointer absolute 
                    top-0 left-[82%] sm:max-md:left-[260px] w-10 h-10
                  text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500
                  hover:text-white duration-300'>
                <CloseIcon />
                </span>
              </motion.div>
             
          </div>
        </div>
      )
    }

    </div>
  )
}

export default HeaderBottom
