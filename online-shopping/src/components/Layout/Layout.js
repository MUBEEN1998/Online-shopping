import React from 'react'
import Header from './Header'
import Footer from './Footer'
import  { Toaster } from 'react-hot-toast';


const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <main className='h-auto' style={{minHeight:''}}>{children}</main>
    <Toaster/>
    </>
  )
}

export default Layout