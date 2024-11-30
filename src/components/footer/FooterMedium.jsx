import React from 'react'
import FooterList from './FooterList'
import { middleList } from '../../constants'
import { logo, flagEt } from '../../assets'

function FooterMedium() {
  return (
    <div className='w-full bg-amazon_light text-white'>
      <div className='w-full border-b-[1px] border-gray-500 p-10'>
        <div className='max-w-5xl mx-auto text-gray-300'>
            <div className='w-full grid xs:sm:grid-cols-1 sml:max-lg:grid-cols-2
             lg:max-xl:grid-cols-4 sml:max-lg:place-items-center sml:max-lg:items-start'>
                {
                    middleList.map((item)=>(
                        <FooterList 
                        key={item._id}
                        title={item.title}
                        listItem={item.listItem}
                         />
                    ))
                }
            
            </div>
           
        </div>
      </div>
      <div className='w-full flex gap-6 items-center justify-center py-6'>
        <div>
            <img className='w-20 pt-3' src={logo} alt="logo" />
        </div>
        <div className='flex gap-2'>
            <p className='flex gap-1 items-center border border-gray-500
            hover:border-amazon_yellow cursor-pointer duration-200
             px-2 py-1'>English</p>
        </div>
        <div className='flex gap-1 items-center justify-center border
        border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1'>
            <img className='w-6' src={flagEt} alt="flag" />
            <p>Ethiopia</p>
        </div>

      </div>
    </div>
  )
}

export default FooterMedium
