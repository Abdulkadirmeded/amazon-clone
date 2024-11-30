import React from 'react'
import { footerBottomItem } from '../../constants'

function FooterBottom() {
  return (
    <div className='w-full bg-footerBottom py-8 '>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='w-full grid xs:max-sml:grid-cols-3 sml:max-md:grid-cols-5 
        md:max-lg:grid-cols-6 lg:max-xl:grid-cols-7 gap-1
        place-content-center text-gray-400'>
            {
                footerBottomItem.map((item)=>(
                    <div key={item._id}>
                        <h3 className='footerBottomTitle loading-3'>{item.title}</h3>
                        <p className='footerBottomText loading-3'>{item.des}</p>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
