import React from 'react'
import Banner from '../components/home/Banner'
import Products from '../components/home/Products'

function Home() {
  return (
    <div>
      <Banner />
      <div className='w-full sm:max-xl:-mt-10  xl:-mt-36 py-10'>
      <Products />
      </div>
    </div>
  )
}

export default Home
