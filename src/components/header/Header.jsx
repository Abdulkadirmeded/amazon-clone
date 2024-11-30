import React, { useEffect, useRef, useState } from 'react'
import { logo } from '../../assets/index'
import { allItems } from '../../constants';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HeaderBottom from './HeaderBottom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";



function Header() {
    const [showAll, setShowAll] = useState(false);
    const auth = getAuth();
    const disptch = useDispatch();
    const products = useSelector((state)=>state.amazon.products);
    const userInfo = useSelector((state)=>state.amazon.userInfo);
    const ref = useRef();
   
    

    useEffect(()=>{
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                showAll && setShowAll(false);
            }
        })
    }, [ref, showAll])
    
    const handleLogout=()=>{
        signOut(auth).then(() => {
            console.log("Sign-out successful.")
            disptch(userSignOut())
          }).catch((error) => {
            console.log("An error happened")
          });
    }

  return (
      <div className='w-full sticky top-0 z-50'>
          <div className='w-full bg-amazon_blue mx-auto text-white px-4 flex items-center gap-4'>
              <Link to="/">
              <div className="headerHover">
                  <img className='w-24 mt-2' src={logo} alt="logo" />
              </div>
              </Link>
              
            <div className='headerHover sm:max-md:hidden mdl:inline-flex'>
                <LocationOnIcon />
                <p className='text-sm text-light_text font-light flex flex-col'>Deleviery to 
                    <span className='text-sm font-semibold -mt-1 text-white_text'>Oman</span></p>
            </div>
            <div className='h-10 rounded-md sm:max-md:hidden mdl:inline-flex flex-grow relative'>
                <span onClick={()=>setShowAll(!showAll)} className='w-14 h-full flex items-center justify-center bg-white 
                hover:bg-[#939392] duration-300 text-amazon_blue cursor-pointer
                rounded-tl-md rounded-bl-md'>All <span></span><ArrowDropDownIcon />
                </span>
                {
                    showAll && (
                        <div>
                            <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll
                            overflow-x-hidden bg-white border-[1px] border-amazon_blue
                            text-black p-2 flex-col gap-1 z-50'>

                               {
                                allItems.map((item)=>(
                                    <li className='text-sm tracking-wide font-titleFont
                                    border-b-[1px] border-b-transparent hover:border-b-amazon_blue
                                    cursor-pointer duration-200 ' key={item._id}>{item.title}</li>
                                ))
                               }

                            </ul>
                        </div>
                    )
                }
                <input className='h-full text-base text-amazon_blue 
                flex-grow outline-none border-none px-2' type="text" />
                <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow 
                hover:bg-[#e1be4ce0] duration-300 text-amazon_blue cursor-pointer
                rounded-tr-md rounded-br-md'>
                    <SearchIcon />
                </span>
            </div>
                <Link to="/signin">
                <div className='flex-col items-start justify-center headerHover'>
                {
                    userInfo ? (<p className='text-sm mdl:text-xs text-white mdl:text-white  font-light'>
                        {userInfo.userName}</p>) : 
                    ( <p className='text-sm mdl:text-xs text-white mdl:text-white  font-light'>
                        Hello, sign in
                    </p>)

                }
                    <p className='text-sm font-semibold -mt-1 sm:max-md:hidden mdl:inline-flex text-white_text '>
                    Accounts & Lists <span><ArrowDropDownIcon /></span></p>
                </div>
                </Link>
                <div className='flex flex-col items-start justify-center headerHover'>
                    <p className='text-xs text-light_text font-light'>Returns</p>
                    <p className='text-sm font-semibold -mt-1 text-white_text'>& Orders</p>
                </div>
               <Link to="/cart">
               <div className='flex items-start justify-center headerHover relative'> 
                    <AddShoppingCartIcon />
                    <p className='text-xs font-semibold -mt-3 text-white_text'>
                        Cart <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4
                        bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                            {
                                products.length > 0 ? products.length : 0
                            }
                            </span></p>
                </div>
               </Link>
               {userInfo && (
                <div onClick={handleLogout} className='flex flex-col justify-center items-center headerHover relative'>
                    <LogoutIcon />
                    <p className='hidden mdl:inline-flex text-xs font-semibold text-white_text'>
                        log out
                    </p>
                    </div>
              ) }

               
          </div>
          <HeaderBottom />
      </div>
   
  )
}

export default Header
