import React from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"
import Home from "./pages/Home";
import { productsData } from "./api/api";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import Registration from "./pages/Registration";

const Layout =()=>{
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
    
  
};

function App() {
 const router = createBrowserRouter(
  createRoutesFromElements(
 
    <Route path="/" element={<Layout />}>
      <Route  index element={<Home />} loader={productsData} ></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
    </Route>
    
 
   
  
  
 ))
  return (
   <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
   </div>
  )
}

export default App
