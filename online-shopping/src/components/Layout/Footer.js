import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <div className='footer bg-[#8B0000] fixed w-full 'style={{marginTop:'auto'}}>
    <h1 className="text-center">All Right Reserved &copy; Shopping</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
    </>
  )
}

export default Footer